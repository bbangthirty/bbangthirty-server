var express = require("express");
var router = express.Router();
const areas = require("../models/areas");
const db = require("../components/db");

router.get("/", async function (req, res, next) {
  try {
    const { user_idx } = req.query;
    const connection = await db.getConnection();
    const results = await users.getList(connection, { user_idx: user_idx });
    res.status(200).json({ results });
  } catch (err) {
    console.log("users get error : ", err);
    next();
  }
});

module.exports = router;
