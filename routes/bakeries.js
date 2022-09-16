const express = require("express");
const router = express.Router();
const bakeries = require("../models/bakeries");
const bakery_address = require("../models/bakery_address");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 가게 정보 불러오기
router.get("/:bakery_id", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.params;
    const connection = await db.getConnection();
    const results = await bakeries.getBakeryInfo(connection, bakery_id);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get bakery info error : ", err);
    next();
  }
});

// 업체 정보 수정
router.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    const { bakery_info, bakery_addr } = req.body;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const bakery_addr_info = await bakery_address.updateBakeryAddress(
      connection,
      bakery_addr
    );
    console.log("bakery_addr_info: ", bakery_addr_info);
    // const bakery_addr_id = bakery_addr_info.insertId;
    bakery_info.user_id = user_id;
    bakery_info.bakery_addr_id = bakery_addr.bakery_addr_id;
    const result = await bakeries.updateBakeryInfo(connection, bakery_info);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("update bakery info error : ", err);
    next();
  }
});

// 가게 삭제
router.delete("/:bakery_id", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await albas.deleteBakery(connection, bakery_id);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("delete bakery error : ", err);
    next();
  }
});

module.exports = router;
