const express = require("express");
const router = express.Router();
const nodemailer = require("../components/nodemailer");
const pwdAuth = require("../models/pwd_auth");
const users = require("../models/users");
const db = require("../components/db");
const crypto = require("../components/crypto");
const dayjs = require("dayjs");
const { isLoggedIn, isNotLoggedIn } = require("../components/middlewares");

// 비밀번호 찾기 = 비밀번호 변경
router.post("/find/password", isNotLoggedIn, async function (req, res, next) {
  try {
    // 비밀번호 초기화 요청 (유저 이메일 입력 신청)
    const { user_mail } = req.body;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    // db에 존재하는 유저의 메일인지 확인
    const userData = await users.getUserList(connection, {
      user_mail: user_mail,
    });
    if (!userData.length) {
      connection.release();
      return res.status(404).json({ errorMessage: "The mail is incorrect." });
    }
    // 인증 토큰 생성
    const { token, data } = crypto.createMailToken(userData[0].user_mail);
    const TokenData = await pwdAuth.insertTokenData(connection, data); // db mail_auth 테이블에 토큰 데이터 저장
    // 생성된 토큰 유저 이메일로 전송
    await nodemailer.sendPwdUrl(
      token,
      userData[0].user_mail,
      userData[0].user_nickname
    );
    await db.commit(connection);
    res.status(200).json({ TokenData });
  } catch (err) {
    console.log("forgot-password post error : ", err);
    next();
  }
});

// 비밀번호 재설정 - 로그인 중 비밀번호 바꾸기는 생략 (잃어버렸을때만 리셋 가능)
router.post(
  "/reset/password/:token",
  isNotLoggedIn,
  async function (req, res, next) {
    try {
      const { token } = req.params;
      const { user_pwd } = req.body;
      const connection = await db.getConnection();
      await db.beginTransaction(connection);
      // db에 저장한 토큰 데이터랑 일치 비교
      const TokenData = await pwdAuth.getTokenData(connection, token);
      console.log("TokenData :", TokenData);
      // 굳이 필요없을 것 같긴 함 - url을 타고 들어왔다는거는 토큰이 생성되었다는 것인데!
      if (!TokenData.length) {
        connection.release();
        return res.status(404).send("token not found");
      }
      // 토큰 데이터의 user_id 값 이용해서 user 정보 가져오기(마지막에 비번 업뎃하기 위해)
      const userInfo = await users.getUserList(connection, {
        user_mail: TokenData[0].user_mail,
      });
      console.log("userInfo :", userInfo);
      // 토큰 제한 시간(10분) 유효성 확인 (ttl처럼 보이게 등록시간을 기준으로 설정했음)
      const createTokenTime = dayjs(TokenData[0].created_at); // db 토큰 데이터 등록 시간
      console.log("createTokenTime:", createTokenTime);
      const expiredTime = createTokenTime.add(10, "minute").format(); // 토큰 등록시간 10분 후
      console.log("expiredTime:", expiredTime);
      const now = dayjs();
      const currentTime = now.format();
      // url 클릭해서 비번 변경 요청 했을 시간이 유효기간 내인 경우 유저가 새로 입력한 비번 암호화해서 업데이트
      if (currentTime < expiredTime) {
        const { salt, encodedPw } = crypto.createPasswordPbkdf2(user_pwd);
        console.log("result :", crypto.createPasswordPbkdf2(user_pwd)); // 왜 이렇게 하면 salt, encodedPw 값이 다르게 나오지? 작동엔 문제 없음
        userInfo[0].salt = salt;
        console.log(userInfo[0].salt);
        userInfo[0].user_pwd = encodedPw;
        console.log(userInfo[0].user_pwd);
      } else {
        connection.release();
        return res.status(401).json({ errorMessage: "expiration time over" });
      }
      await users.updateUserInfo(connection, userInfo[0], userInfo[0].user_id); // 새로운 비밀번호로 업데이트
      await db.commit(connection);
      res.status(200).json("reset password completed");
    } catch (err) {
      console.log("reset-password post error : ", err);
      next();
    }
  }
);

module.exports = router;
