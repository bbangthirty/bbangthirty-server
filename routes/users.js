const express = require("express");
const router = express.Router();
const users = require("../models/users");
const db = require("../components/db");
const crypto = require("../components/crypto");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../components/middlewares");

// 회원가입
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  try {
    const { user_info } = req.body;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const userList = await users.getUserList(connection, {
      user_mail: user_info.user_mail,
    });
    console.log("userList: ", userList);
    if (userList.length) {
      return res.redirect("/join?error=exist");
    }
    const { salt, encodedPw } = crypto.createPasswordPbkdf2(user_info.user_pwd);
    user_info.salt = salt;
    user_info.user_pwd = encodedPw;
    const result = await users.insertUserInfo(connection, user_info);
    console.log("result: ", result);
    await db.commit(connection);
    // res.status(200).json({ result });
    res.redirect("/");
  } catch (err) {
    console.log("join error : ", err);
    next();
  }
});

// 로컬 로그인
router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // local까지 실행되고 passport.localStrategy-> done으로 복귀
    // console.log("user:", user);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/login?error=${info.message}`);
    }
    //passport.authenticate() 미들웨어는 req.login()을 자동으로 호출
    return req.login(user, async (loginError) => {
      console.log("req.session:", req.session);
      //req.login 하는 순간 passport.index serializeUser 실행
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 이쯤 숨겨진 과정 : 세션 쿠키를 브라우저로 보내준다.
      // delete user.user_pwd;
      // delete user.salt;
      // delete user.created_at;
      // delete user.updated_at;
      // delete user.deleted_at;
      // res.status(200).json({ result: user });
      res.redirect("/");
    });
  })(req, res, next); // 미들웨어 확장) 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

// 카카오 로그인
router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao")); // 이거 실행하면 카카오톡 홈페이지가서 로그인하고 콜백 받아서 돌아옴

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    // 이때는 kakaoStrategy로 감.
    failureRedirect: "/", // 실패시
  }),
  (req, res) => {
    res.redirect("/"); // 성공시
  }
);

// 로그아웃
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// 회원정보 수정
router.put("/", isLoggedIn, async (req, res, next) => {
  console.log("req.isAuthenticated", req.isAuthenticated());
  console.log("req.user", req.user);
  try {
    const { user_nickname, user_mail } = req.body; // body 통채로 받아서 넣으면 비번 강제 입력 공격에 위험할 것 같아서 이렇게 처리
    const user_info = { user_nickname: user_nickname, user_mail: user_mail };
    const user_id = req.user[0].user_id;
    console.log(user_id);
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await users.updateUserInfo(connection, user_info, user_id);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("update user error ", err);
    next();
  }
});

// 회원탈퇴
router.delete("/:user_id", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await users.deleteUserInfo(connection, { user_id: user_id });
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("delete user error ", err);
    next();
  }
});

// user_id로 회원 검색
router.get("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const connection = await db.getConnection();
    const userList = await users.getUserList(connection, { user_id: user_id });
    console.log("userList ", userList);
    connection.release;
    if (!userList.deleted_at === null) {
      return res.status(404).json({ errorMessage: "user deleted" });
    }
    delete userList[0].user_pwd;
    delete userList[0].salt;
    delete userList[0].created_at;
    delete userList[0].updated_at;
    delete userList[0].deleted_at;
    res.status(200).json({ userList });
  } catch (err) {
    console.log("get user error : ", err);
    next();
  }
});

//  user_mail로 회원 검색
router.get("/", async (req, res, next) => {
  try {
    const { user_mail } = req.query;
    const connection = await db.getConnection();
    const userList = await users.getUserList(connection, {
      user_mail: user_mail,
    });
    connection.release;
    console.log("userList ", userList);
    if (!userList.deleted_at === null) {
      return res.status(404).json({ errorMessage: "user deleted" });
    }
    delete userList[0].user_pwd;
    delete userList[0].salt;
    delete userList[0].created_at;
    delete userList[0].updated_at;
    delete userList[0].deleted_at;
    res.status(200).json({ userList });
  } catch (err) {
    console.log("users get error : ", err);
    next();
  }
});

module.exports = router;
