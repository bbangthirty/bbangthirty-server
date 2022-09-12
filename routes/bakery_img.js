const express = require("express");
const router = express.Router();
const s3 = require("../components/s3");
const { isLoggedIn } = require("../components/middlewares");

// 회원가입 프로세스 - 업체등록에서 업체 상세정보에 들어갈 이미지 등록 정보 전달
router.post(
  "/",
  isLoggedIn,
  s3.bakeryImg_upload.single("img"),
  async (req, res, next) => {
    try {
      console.log("req.file:", req.file);
      const imgPath = req.file.location;
      const imgKey = req.file.key;
      const iks = imgKey.split("/");
      const fileName = iks[iks.length - 1];
      res.status(200).json({ url: imgPath, fileName: fileName });
    } catch (err) {
      console.log("post profile_img error : ", err);
      next(err);
    }
  }
);

module.exports = router;
