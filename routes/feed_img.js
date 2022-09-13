const express = require("express");
const router = express.Router();
const s3 = require("../components/s3");
const { isLoggedIn } = require("../components/middlewares");

// 빵떠리 등록 프로세스 - 피드 이미지 등록 정보 전달
router.post(
  "/",
  isLoggedIn,
  s3.feedImg_upload.single("img"),
  async (req, res, next) => {
    try {
      console.log("req.file:", req.file);
      const imgPath = req.file.location;
      const imgKey = req.file.key;
      const iks = imgKey.split("/");
      const fileName = iks[iks.length - 1];
      res.status(200).json({ url: imgPath, fileName: fileName });
    } catch (err) {
      console.log("post feedImg error : ", err);
      next(err);
    }
  }
);

module.exports = router;
