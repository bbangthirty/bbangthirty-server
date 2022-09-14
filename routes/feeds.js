const express = require("express");
const router = express.Router();
const feeds = require("../models/feeds");
const areas = require("../models/areas");
const db = require("../components/db");
const { isLoggedIn, isNotLoggedIn } = require("../components/middlewares");

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

// 빵떠리 당일 등록한 우리 가게 피드 가져오기
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.query;
    const connection = await db.getConnection();
    const results = await feeds.getMyStoreFeedToday(connection, bakery_id);
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

// 당일 등록된 빵떠리의 모든 피드 가져오기
router.get("/all", isLoggedIn, async (req, res, next) => {
  try {
    const connection = await db.getConnection();
    const results = await feeds.getFeedAllToday(connection);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get feed error : ", err);
    next();
  }
});

// 관심빵 태그로 피드 필터링 기능
router.get("/breadName/:bread_name", isLoggedIn, async (req, res, next) => {
  try {
    let filteredFeeds = [];
    const { bread_name } = req.params;
    const connection = await db.getConnection();
    const feedAll = await feeds.getFeedAllToday(connection);
    console.log("feedAll:", feedAll);
    connection.release();
    for (let feed of feedAll) {
      let breads_name = feed.breads.split(",");
      console.log(breads_name);
      let found = breads_name.find((bn) => bn.includes(bread_name));
      if (found) filteredFeeds.push(feed);
    }
    console.log("filteredFeeds : ", filteredFeeds);
    res.status(200).json({ results: filteredFeeds });
  } catch (err) {
    console.log("get feed filtered with fv_bread error : ", err);
    next();
  }
});

// 등록된 동네의 피드 가져오기
router.get("/myArea", isLoggedIn, async (req, res, next) => {
  try {
    const { sido_name, sigg_name, emd_name } = req.body;
    const connection = await db.getConnection();
    const results = await feeds.getAreaFeedsToday(
      connection,
      sido_name,
      sigg_name,
      emd_name
    );
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get feed error : ", err);
    next();
  }
});

// 비회원 검색 설정한 동네 피드 가져오기
router.get("/area/:area_id", isNotLoggedIn, async (req, res, next) => {
  try {
    const { area_id } = req.params;
    const connection = await db.getConnection();
    const areaInfo = await areas.getAreaInfo(connection, area_id);
    const results = await feeds.getAreaFeedsToday(
      connection,
      areaInfo[0].sido_name,
      areaInfo[0].sigg_name,
      areaInfo[0].emd_name
    );
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get feed error : ", err);
    next();
  }
});

// 단골빵집 피드 가져오기
module.exports = router;
