var express = require("express");
var router = express.Router();
const areas = require("../models/areas");
const db = require("../components/db");

//
router.post("/", async function (req, res, next) {
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const results = await areas.insertJibunList(connection);
    await db.commit(connection);
    res.status(200).json({ results });
  } catch (err) {
    console.log("areas post error : ", err);
    next();
  }
});

// 동네검색 기능
router.get("/search", async function (req, res, next) {
  try {
    const { name } = req.query;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const results = await areas.areaListByName(connection, { name: name });
    await db.commit(connection);
    res.status(200).json({ results });
  } catch (err) {
    console.log("areas search error : ", err);
    next();
  }
});

router.get("/test", async function (req, res, next) {
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const results = await areas.getList(connection);
    await db.commit(connection);
    res.status(200).json({ results });
  } catch (err) {
    console.log("areas search error : ", err);
    next();
  }
});

module.exports = router;
