const express = require("express");
const router = express.Router();
const fv_bakeries = require("../models/fv_bakeries");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 단골빵집 등록 기능 (하트)
router.post("/:bakery_id/like", isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.user[0].user_id;
    const { bakery_id } = req.params;
    const param = { user_id, bakery_id };
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const like = await fv_bakeries.getLikehist(connection, param);
    if (like.length) {
      return res.json({ errorMessage: "already like" });
    }
    const result = await fv_bakeries.likeBakery(connection, param);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("post like error : ", err);
    next();
  }
});

// 단골빵집 해제 (빈하트)
router.post("/:bakery_id/unlike", isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.user[0].user_id;
    const { bakery_id } = req.params;
    const param = { user_id, bakery_id };
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const like = await fv_bakeries.getLikehist(connection, param);
    if (!like.length) {
      return res.json({ errorMessage: "no like" });
    }
    const result = await fv_bakeries.unLikeBakery(connection, param);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("post like error : ", err);
    next();
  }
});

module.exports = router;
