const express = require("express");
const router = express.Router();
const areas = require("../models/areas");
const db = require("../components/db");

// 주소 DB 구축용
router.post("/", async (req, res, next) => {
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
router.get("/search/:areaName", async (req, res, next) => {
  try {
    const areaName = decodeURIComponent(req.params.areaName);
    const connection = await db.getConnection();
    const results = await areas.areaListByName(connection, { areaName });
    console.log(results);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("areas search error : ", err);
    next();
  }
});

module.exports = router;
