const express = require("express");
const router = express.Router();
const myAreas = require("../models/myAreas");
const db = require("../components/db");

router.get("/", async function (req, res, next) {
  try {
    const {} = req.body;
    const connection = await db.getConnection();

    await db.commit(connection);
    res.status(200).json({ results });
  } catch (err) {
    console.log(" error : ", err);
    next();
  }
});

module.exports = router;
