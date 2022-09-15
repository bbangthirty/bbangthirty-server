const express = require("express");
const router = express.Router();
const myAreas = require("../models/my_areas");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

// 유저의 등록된 동네 가져오기
router.get("/", isLoggedIn, async function (req, res, next) {
  try {
    const user_id = req.user[0].user_id;
    const connection = await db.getConnection();
    const areaList = await myAreas.getAreaList(connection, {
      user_id: user_id,
    });
    console.log("AreaList: ", areaList);
    connection.release();
    res.status(200).json({ areaList });
  } catch (err) {
    console.log(" error : ", err);
    next();
  }
});

// 동네 등록
router.post("/:area_id", isLoggedIn, async (req, res, next) => {
  try {
    let result;
    const user_id = req.user[0].user_id;
    const { area_id } = req.params;
    const registParam = { user_id: user_id, area_id: area_id };
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const registAreaInfo = await myAreas.getRegistAreaInfo(connection, user_id);
    // 프론트에서 동네 등록 두개 칸만 만들어 놓을건데 db에서도 해줘야 하나? 일단 내가 테스트할 때 2개 이상 등록되는거 방지
    if (registAreaInfo.length === 2)
      return res.status(404).json({ errorMessage: "can't register anymore." });
    // 동네등록 총 2개인데 하나가 등록되어 있다면
    if (registAreaInfo.length) {
      result = await myAreas.registSecondArea(connection, registParam); // fixed_area = "N"
    } else {
      result = await myAreas.registfirstArea(connection, registParam); // default : fixed_area = "Y"
    }
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("post myAreas error : ", err);
    next();
  }
});

// 동네 등록 취소
router.delete("/:my_area_id", isLoggedIn, async (req, res, next) => {
  try {
    let result;
    const user_id = req.user[0].user_id;
    const { my_area_id } = req.params;
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    // 등록했던 동네 삭제
    await myAreas.deleteMyAreaInfo(connection, {
      my_area_id: my_area_id,
    });
    await db.commit(connection);
    // 이렇게 연결 해제하고 또 연결하는건 좀 무식하고 안좋은 것 같지만 일단 작동되게....
    const connection2 = await db.getConnection();
    // 삭제하고 남은 등록되어 있는  동네 검색
    const registAreaInfo = await myAreas.getRegistAreaInfo(
      connection2,
      user_id
    );
    // 만약 등록되어 있는 동네가 있는데 고정 동네가 아닐 경우 "Y" 로 업뎃 => 남아있는 한개의 동네를 고정 동네로 지정
    if (registAreaInfo.length && registAreaInfo[0].fixed_area === "N") {
      result = await myAreas.updateFixedArea(
        connection2,
        registAreaInfo[0].my_area_id
      );
    }
    await db.commit(connection2);
    res.status(200).json({ result });
  } catch (err) {
    console.log("delete myAreas error ", err);
    next();
  }
});

module.exports = router;
