const express = require("express");
const router = express.Router();
const fvBreads = require("../models/fv_breads");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 관심빵 등록
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { bread_name } = req.body;
    const user_id = req.user[0].user_id;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const fvBreadList = await fvBreads.getFvBreadList(connection, user_id);
    for (let fb of fvBreadList) {
      if (fb.bread_name === bread_name) {
        return res.status(404).json({ errorMessage: "Duplicate bread name" });
      }
    }
    const result = await fvBreads.registFvBread(connection, {
      bread_name: bread_name,
      user_id: user_id,
    });
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("post favorite bread error : ", err);
    next();
  }
});

// 관심빵 목록 가져오기
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    const connection = await db.getConnection();
    const results = await fvBreads.getFvBreadList(connection, user_id);
    console.log(results);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get favorite bread error : ", err);
    next();
  }
});

// 관심빵 삭제하기
router.delete("/:fv_bread_id", isLoggedIn, async (req, res, next) => {
  try {
    const { fv_bread_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await fvBreads.deleteFvBread(connection, fv_bread_id);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("deletefavorite bread error : ", err);
    next();
  }
});

// 삭제했던 빵 목록 가져오기
router.get("/deleted", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    const connection = await db.getConnection();
    const results = await fvBreads.getDeletedFvBreadList(connection, user_id);
    console.log(results);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get favorite bread error : ", err);
    next();
  }
});

module.exports = router;
