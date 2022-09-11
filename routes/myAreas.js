const express = require("express");
const router = express.Router();
const myAreas = require("../models/myAreas");
const db = require("../components/db");
const { isLoggedIn, isNotLoggedIn } = require("../components/middlewares");

router.get("/:user_id", async function (req, res, next) {
  try {
    const { user_id } = req.params;
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

router.post("/", async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    const { area_id } = req.body;
    const registArea = { user_id: user_id, area_id: area_id };
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const results = await myAreas.RegistAreaInfo(connection, registArea);
    await db.commit(connection);
    res.status(200).json({ results });
  } catch (err) {
    console.log("areas post error : ", err);
    next();
  }
});

module.exports = router;
