const express = require("express");
const router = express.Router();
const nodemailer = require("../components/nodemailer");
const albaAuth = require("../models/alba_auth");
const users = require("../models/users");
const albas = require("../models/albas");
const db = require("../components/db");
const crypto = require("../components/crypto");
const dayjs = require("dayjs");
const { isLoggedIn } = require("../components/middlewares");

// 알바생 초대
router.post("/invite/alba", isLoggedIn, async function (req, res, next) {
  try {
    const { bakery_id, bakery_name, user_mail } = req.body;
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
    const TokenData = await albaAuth.insertTokenData(connection, data); // db mail_auth 테이블에 토큰 데이터 저장
    // 생성된 토큰 유저 이메일로 전송
    await nodemailer.sendAlbaUrl(
      token,
      userData[0].user_mail,
      userData[0].user_name,
      bakery_name,
      bakery_id
    );
    const param = { bakery_id: bakery_id, user_id: userData[0].user_id };
    await albas.albaDaegi(connection, param); // 수락 전 대기상태로 DB insert -> regist = N
    await db.commit(connection);
    res.status(200).json({ TokenData });
  } catch (err) {
    console.log("alba invite error : ", err);
    next();
  }
});

// 알바생 수락 (user -> alba role 변경)
router.post("/accept/:token", isLoggedIn, async function (req, res, next) {
  try {
    const { bakery_id } = req.query;
    const { token } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    // db에 저장한 토큰 데이터랑 일치 비교
    const TokenData = await albaAuth.getTokenData(connection, token);
    console.log("TokenData :", TokenData);
    // 굳이 필요없을 것 같긴 함 - url을 타고 들어왔다는거는 토큰이 생성되었다는 것인데!
    if (!TokenData.length) {
      connection.release();
      return res.status(404).send("token not found");
    }
    // 토큰 데이터의 user_mail 값 이용해서 user 정보 가져오기
    const userInfo = await users.getUserList(connection, {
      user_mail: TokenData[0].user_mail,
    });
    console.log("userInfo :", userInfo);
    const createTokenTime = dayjs(TokenData[0].created_at); // db 토큰 데이터 등록 시간
    console.log("createTokenTime:", createTokenTime);
    const expiredTime = createTokenTime.add(1, "day").format(); // 토큰 등록 후 하루까지 허용
    console.log("expiredTime:", expiredTime);
    const now = dayjs();
    const currentTime = now.format();
    // url 클릭해서 알바 수락했을 시간이 유효기간 내인 경우 user -> alba로 role 변경
    const param = { bakery_id: bakery_id, user_id: userInfo[0].user_id };
    if (currentTime < expiredTime) {
      await users.updateRoleAsAlba(connection, userInfo[0].user_id); // user -> alba로 role 변경
      await albas.albaConfirm(connection, param); // regitst = Y
    } else {
      connection.release();
      return res.status(401).json({ errorMessage: "expiration time over" });
    }
    await db.commit(connection);
    res.status(200).json("regist alba completed");
  } catch (err) {
    console.log("regist alba post error : ", err);
    next();
  }
});

module.exports = router;
