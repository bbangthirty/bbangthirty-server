const express = require("express");
const router = express.Router();
const notices = require("../models/notices");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const connection = await db.getConnection();
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get notice error : ", err);
    next();
  }
});

module.exports = router;
