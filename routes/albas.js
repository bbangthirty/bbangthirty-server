const express = require("express");
const router = express.Router();
const albas = require("../models/albas");
const users = require("../models/users");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 대기 상태 알바 목록 가져오기
router.get("/daegi", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.query;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const daegiList = await albas.getDaegiList(connection, bakery_id);
    if (!daegiList.length) {
      return res.status(404).json({ errorMessage: "No daegi status alba." });
    }
    const userInfo = await users.getUserList(connection, {
      user_id: daegiList[0].user_id,
    });
    delete userInfo[0].user_pwd;
    delete userInfo[0].salt;
    await db.commit(connection);
    res.status(200).json({ userInfo });
  } catch (err) {
    console.log("get daegi alba error : ", err);
    next();
  }
});

// 수락 상태 알바 목록 가져오기
router.get("/confirm", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.query;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const confirmList = await albas.getConfirmList(connection, bakery_id);
    if (!confirmList.length) {
      return res.status(404).json({ errorMessage: "No confirm status alba." });
    }
    const userInfo = await users.getUserList(connection, {
      user_id: confirmList[0].user_id,
    });
    delete userInfo[0].user_pwd;
    delete userInfo[0].salt;
    await db.commit(connection);
    res.status(200).json({ userInfo });
  } catch (err) {
    console.log("get confirm alba error : ", err);
    next();
  }
});

// 알바생 삭제 (계속 대기 상태인 잠수 알바 && 기존 알바)
router.delete("/:alba_id", isLoggedIn, async (req, res, next) => {
  try {
    const { alba_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await albas.deleteAlbaInfo(connection, alba_id);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("delete alba error : ", err);
    next();
  }
});

module.exports = router;
