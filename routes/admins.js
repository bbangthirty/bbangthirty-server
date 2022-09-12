const express = require("express");
const router = express.Router();
const bakeries = require("../models/bakeries");
const users = require("../models/users");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

router.get("/bakeryForEntry", isLoggedIn, async (req, res, next) => {
  try {
    const connection = await db.getConnection();
    const results = await bakeries.getBakeryListForEntry(connection);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get BakeryListForEntry error : ", err);
    next();
  }
});

router.put("/approve", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.query;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    await bakeries.approve(connection, bakery_id);
    const bakeryInfo = await bakeries.getBakeryInfo(connection, bakery_id);
    const result = await users.updateRoleAsOwner(
      connection,
      bakeryInfo[0].user_id
    );
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("update bakery approve error ", err);
    next();
  }
});

router.put("/disapprove", isLoggedIn, async (req, res, next) => {
  try {
    const { bakery_id } = req.query;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    await bakeries.disApprove(connection, bakery_id);
    const bakeryInfo = await bakeries.getBakeryInfo(connection, bakery_id);
    const result = await users.updateRoleAsUser(
      connection,
      bakeryInfo[0].user_id
    );
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("update bakery disapprove error ", err);
    next();
  }
});

module.exports = router;
