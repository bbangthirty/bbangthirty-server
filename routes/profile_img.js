const express = require("express");
const router = express.Router();
const profile_img = require("../models/profile_img");
const db = require("../components/db");
const s3 = require("../components/s3");
const { isLoggedIn } = require("../components/middlewares");

// 프로필 이미지 등록
router.post(
  "/",
  isLoggedIn,
  s3.upload.single("img"),
  async (req, res, next) => {
    try {
      const user_id = req.user[0].user_id;
      console.log("req.file:", req.file);
      const imgPath = req.file.location;
      const connection = await db.getConnection();
      await db.beginTransaction(connection);
      await profile_img.insertImgPath(connection, imgPath, user_id);
      await db.commit(connection);
      res.status(200).json({ url: imgPath });
    } catch (err) {
      console.log("post profile_img error : ", err);
      next(err);
    }
  }
);

// 프로필 이미지 변경 (변경 및 기존 등록된 이미지 s3에서 삭제)
router.put("/", isLoggedIn, s3.upload.single("img"), async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    console.log("req.file:", req.file);
    const imgPath = req.file.location;
    const imgKey = req.file.key;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const originImgPath = await profile_img.getImgPath(connection, user_id);
    await profile_img.insertImgPath(connection, imgPath, user_id);
    await db.commit(connection);
    const ips = originImgPath[0].profile_img.split("/");
    const originImgKey = `${ips[ips.length - 2]}/${ips[ips.length - 1]}`;
    console.log("originImgKey:", originImgKey);
    s3.s3.deleteObject(
      {
        Bucket: "bbangthirty",
        Key: originImgKey,
      },
      (err, data) => {
        if (err) {
          console.log("s3 img delete error");
        } else {
          console.log("aws img delete success" + data);
        }
      }
    );
    res.status(200).json({ url: imgPath });
  } catch (err) {
    console.log("update profile_img error : ", err);
    next(err);
  }
});

// 프로필 이미지 삭제
router.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    const user_id = req.user[0].user_id;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const originImgPath = await profile_img.getImgPath(connection, user_id);
    console.log("originImgPath:", originImgPath);
    if (originImgPath) {
      await profile_img.deleteImgPath(connection, user_id);
    }
    await db.commit(connection);
    const ips = originImgPath[0].profile_img.split("/");
    const originImgKey = `${ips[ips.length - 2]}/${ips[ips.length - 1]}`;
    console.log("originImgKey:", originImgKey);
    s3.s3.deleteObject(
      {
        Bucket: "bbangthirty",
        Key: originImgKey,
      },
      (err, data) => {
        if (err) {
          console.log("s3 img delete error");
        } else {
          console.log("aws img delete success" + data);
          res.status(200).json({ result: data });
        }
      }
    );
  } catch (err) {
    console.log("delete profile_img error : ", err);
    next(err);
  }
});

module.exports = router;
