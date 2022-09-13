const express = require("express");
const router = express.Router();
const feeds = require("../models/feeds");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 빵떠리 피드 등록
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id; // writer
    const { feed_info } = req.body;
    feed_info.user_id = user_id;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await feeds.registFeed(connection, feed_info);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("post feed error : ", err);
    next();
  }
});

// 빵떠리 당일 등록한 피드 정보 가져오기
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const connection = await db.getConnection();
    const results = await feeds.getTodayFeedInfo(connection);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get feed error : ", err);
    next();
  }
});

// 빵떠리 피드 수정
router.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id; // writer
    const { feed_info } = req.body;
    feed_info.user_id = user_id;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await feeds.updateFeedInfo(connection, feed_info);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("update feed error : ", err);
    next();
  }
});

// 빵떠리 피드 품절 처리
router.put("/:feed_id/soldout", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id; // writer
    const { feed_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await feeds.feedSoldout(connection, user_id, feed_id);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("update feed soldout error : ", err);
    next();
  }
});

// 빵떠리 피드 품절 처리 복구
router.put("/:feed_id/restore", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id; // writer
    const { feed_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await feeds.feedRestore(connection, user_id, feed_id);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("update feed restore error : ", err);
    next();
  }
});

// 빵떠리 피드 삭제
router.delete("/:feed_id", isLoggedIn, async (req, res, next) => {
  try {
    const { feed_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await feeds.deleteFeed(connection, feed_id);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("delete feed error : ", err);
    next();
  }
});

// 빵떠리 피드 등록 히스토리
router.get("/history", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.query;
    const connection = await db.getConnection();
    const results = await feeds.getFeedAll(connection, bakery_id);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get feed all error : ", err);
    next();
  }
});

module.exports = router;
