const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const users = require("../../models/users");
const db = require("../db");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser");
    console.log("user:", user);
    done(null, user.user_id); // 세션에 user의 id만 저장 (메모리 차원에서 id정보만 가지고 있고)
  });

  // 세션 쿠키 :  { user_id: 3, 'connect.sid': s%3894723894723598}

  passport.deserializeUser((user_id, done) => {
    // 필요할때 id정보로 유저정보 불러오고
    const connection = db.getConnection();
    users
      .getUserList(connection, { user_id: user_id })
      .then((user) => done(null, user)) // 유저 전체 복구 -> req.user로 접근 가능, req.isAuthenticated() -> 로그인했다면 true
      .catch((err) => done(err));
  });

  local();
  kakao();
};
