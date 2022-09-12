const express = require("express");
const router = express.Router();
const users = require("../models/users");
const bakery_address = require("../models/bakery_address");
const bakeries = require("../models/bakeries");
const db = require("../components/db");
const crypto = require("../components/crypto");
const { isNotLoggedIn } = require("../components/middlewares");

// 점주 회원가입 & 업체 등록
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  try {
    const { owner_info, bakery_info, bakery_address } = req.body;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const ownerList = await users.getUserList(connection, {
      user_mail: owner_info.user_mail,
    });
    console.log("ownerList: ", ownerList);
    if (ownerList.length) {
      return res.redirect("/join?error=exist");
    }
    const { salt, encodedPw } = crypto.createPasswordPbkdf2(
      owner_info.user_pwd
    );
    owner_info.salt = salt;
    owner_info.user_pwd = encodedPw;
    const ownerInfo = await users.insertUserInfo(connection, owner_info);
    const user_id = ownerInfo.insertId;
    const bakery_addr = await bakery_address.insertBakeryAddress(
      connection,
      bakery_address
    );
    console.log("bakery_addr: ", bakery_addr);
    const bakery_addr_id = bakery_addr.insertId;
    bakery_info.user_id = user_id;
    bakery_info.bakery_addr_id = bakery_addr_id;
    await bakeries.insertBakeryInfo(connection, bakery_info);
    await db.commit(connection);
    // res.status(200).json({ result });
    res.redirect("/");
  } catch (err) {
    console.log("join error : ", err);
    next();
  }
});

module.exports = router;
