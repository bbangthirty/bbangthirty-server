const express = require("express");
const router = express.Router();
const profile_img = require("../models/profile_img");
const db = require("../components/db");
const s3 = require("../components/s3");
const { isLoggedIn } = require("../components/middlewares");

// 프로필 이미지 등록 후 db에 s3 path 저장
router.post(
  "/",
  isLoggedIn,
  s3.profileImg_upload.single("img"),
  async (req, res, next) => {
    try {
      const user_id = req.user[0].user_id;
      console.log("req.file:", req.file);
      const imgPath = req.file.location;
      const connection = await db.getConnection();
      await db.beginTransaction(connection);
      await profile_img.insertImgPath(connection, imgPath, user_id); // db s3 path 저장
      await db.commit(connection);
      res.status(200).json({ url: imgPath });
    } catch (err) {
      console.log("post profile_img error : ", err);
      next(err);
    }
  }
);

// 프로필 이미지 변경 (변경 및 기존 등록된 이미지 s3에서 삭제)
router.put(
  "/",
  isLoggedIn,
  s3.profileImg_upload.single("img"),
  async (req, res, next) => {
    try {
      const user_id = req.user[0].user_id;
      console.log("req.file:", req.file);
      const imgPath = req.file.location;
      const connection = await db.getConnection();
      await db.beginTransaction(connection);
      const originImgPath = await profile_img.getImgPath(connection, user_id); // DB에 있는 s3 이미지 path 가져오기 ex) profile_img: 'https://bbangthirty.s3.ap-northeast-2.amazonaws.com/profileImg/1663333091733_test4.JPG'
      console.log("originImgPath :", originImgPath);
      await profile_img.insertImgPath(connection, imgPath, user_id); // 기존 DB에 있는 s3 이미지 path를 새로운 s3 이미지 path로 업뎃 후
      await db.commit(connection);
      const ips = originImgPath[0].profile_img.split("/");
      const originImgKey = `${ips[ips.length - 2]}/${ips[ips.length - 1]}`; // originImgKey: profileImg/1663333091733_test4.JPG
      console.log("originImgKey:", originImgKey);
      // s3에 있는 이미지 삭제
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
  }
);

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
    // s3에 있는 이미지 삭제
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
