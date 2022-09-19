const express = require("express");
const router = express.Router();
const users = require("../models/users");
const bakery_address = require("../models/bakery_address");
const bakeries = require("../models/bakeries");
const db = require("../components/db");
const crypto = require("../components/crypto");
const { isLoggedIn, isNotLoggedIn } = require("../components/middlewares");

// // 점주 회원가입 & 업체 등록 -> 회원가입 후 마이페이지에서 가게 등록하는 시스템으로 바꿈
// router.post("/join", isNotLoggedIn, async (req, res, next) => {
//   try {
//     const { owner_info, bakery_info, bakery_addr } = req.body;
//     const connection = await db.getConnection();
//     await db.beginTransaction(connection);
//     const ownerList = await users.getUserList(connection, {
//       user_mail: owner_info.user_mail,
//     });
//     console.log("ownerList: ", ownerList);
//     if (ownerList.length) {
//       return res.redirect("/join?error=exist");
//     }
//     const { salt, encodedPw } = crypto.createPasswordPbkdf2(
//       owner_info.user_pwd
//     );
//     owner_info.salt = salt;
//     owner_info.user_pwd = encodedPw;
//     const ownerInfo = await users.insertUserInfo(connection, owner_info);
//     const user_id = ownerInfo.insertId;
//     const bakery_addr_info = await bakery_address.insertBakeryAddress(
//       connection,
//       bakery_addr
//     );
//     console.log("bakery_addr_info: ", bakery_addr_info);
//     const bakery_addr_id = bakery_addr_info.insertId;
//     bakery_info.user_id = user_id;
//     bakery_info.bakery_addr_id = bakery_addr_id;
//     await bakeries.insertBakeryInfo(connection, bakery_info);
//     await db.commit(connection);
//     // res.status(200).json({ result });
//     res.redirect("/");
//   } catch (err) {
//     console.log("join error : ", err);
//     next();
//   }
// });

// 점주 업체 등록(추가 등록 포함)
router.post("/addBakery", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    const { bakery_info, bakery_addr } = req.body;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const bakery_addr_info = await bakery_address.insertBakeryAddress(
      connection,
      bakery_addr
    );
    console.log("bakery_addr_info: ", bakery_addr_info);
    const bakery_addr_id = bakery_addr_info.insertId;
    bakery_info.user_id = user_id;
    bakery_info.bakery_addr_id = bakery_addr_id;
    await bakeries.insertBakeryInfo(connection, bakery_info);
    await db.commit(connection);
    // res.status(200).json({ result });
    res.redirect("/");
  } catch (err) {
    console.log("post addBakery error : ", err);
    next();
  }
});

// 점주의 업체 목록 가져오기
router.get("/bakeryList", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    console.log("user_id: ", user_id);
    const connection = await db.getConnection();
    const results = await bakeries.getOwnerBakeryList(connection, user_id);
    connection.release();
    res.status(200).json({ results });
  } catch (err) {
    console.log("get OwnerBakeryList error : ", err);
    next();
  }
});

module.exports = router;
