const express = require("express");
const router = express.Router();
const fv_bakeries = require("../models/fv_bakeries");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 단골빵집 등록 기능
router.post("/", isLoggedIn, async function (req, res, next) {
  try {
    const { bakery_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("post like error : ", err);
    next();
  }
});

module.exports = router;
