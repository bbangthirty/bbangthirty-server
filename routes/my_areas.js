const express = require("express");
const router = express.Router();
const myAreas = require("../models/my_areas");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 유저의 등록된 동네 가져오기
router.get("/", isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.user[0].user_id;
    const connection = await db.getConnection();
    const areaList = await myAreas.getAreaList(connection, {
      user_id: user_id,
    });
    console.log("AreaList: ", areaList);
    connection.release;
    res.status(200).json({ areaList });
  } catch (err) {
    console.log(" error : ", err);
    next();
  }
});

// 동네 등록
router.post("/:area_id", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    const { area_id } = req.params;
    const registArea = { user_id: user_id, area_id: area_id };
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await myAreas.RegistAreaInfo(connection, registArea);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("post myAreas error : ", err);
    next();
  }
});

// 동네 등록 취소
router.delete("/:my_area_id", isLoggedIn, async (req, res, next) => {
  try {
    const { my_area_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await myAreas.deleteMyAreaInfo(connection, {
      my_area_id: my_area_id,
    });
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("delete myAreas error ", err);
    next();
  }
});

module.exports = router;
