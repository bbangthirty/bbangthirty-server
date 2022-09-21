const db = require("../components/db");

module.exports.registFeed = async (connection, options) => {
  let query = `INSERT INTO feeds SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getMyStoreFeedToday = async (connection, options) => {
  let query = `SELECT * FROM feeds WHERE bakery_id = ? and DATE(created_at) = DATE(now())`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.updateFeedInfo = async (connection, options) => {
  let query = `UPDATE feeds SET ? WHERE feed_id = ?`;
  let values = [options, options.feed_id];
  return await db.query(connection, { query: query, values: values });
};

module.exports.feedSoldout = async (connection, reqUserID, options) => {
  let query = `UPDATE feeds SET soldout = "Y", user_id = ? WHERE feed_id = ?`;
  let values = [reqUserID, options];
  return await db.query(connection, { query: query, values: values });
};

module.exports.feedRestore = async (connection, reqUserID, options) => {
  let query = `UPDATE feeds SET soldout = "N", user_id = ? WHERE feed_id = ?`;
  let values = [reqUserID, options];
  return await db.query(connection, { query: query, values: values });
};

module.exports.deleteFeed = async (connection, options) => {
  let query = `DELETE FROM feeds WHERE feed_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getFeedAll = async (connection, options) => {
  let query = `SELECT * FROM feeds WHERE bakery_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getFeedAllToday = async (connection, options) => {
  let query = `SELECT * FROM feeds WHERE DATE(created_at) = DATE(now())`;
  return await db.query(connection, { query: query });
};

// 비회원 - 검색 설정한 동네 피드 보여주기
module.exports.getAreaFeedsToday = async (
  connection,
  sido_name,
  sigg_name,
  emd_name
) => {
  let query = `SELECT t1.*, t2.bakery_name FROM feeds t1, bakeries t2, bakery_address t3 WHERE t3.sido_name = ? and t3.sigg_name = ? and t3.emd_name = ? and t3.bakery_addr_id = t2.bakery_id and t1.bakery_id = t2.bakery_id and DATE(t1.created_at) = DATE(now())`;
  let values = [sido_name, sigg_name, emd_name];
  return await db.query(connection, { query: query, values: values });
};

// 회원용 - 등록된 동네 피드 보여주기
module.exports.getMemberAreaFeedsToday = async (
  connection,
  user_id,
  sido_name,
  sigg_name,
  emd_name
) => {
  let query = `SELECT t1.*, t2.bakery_name, t4.*  FROM feeds t1, bakeries t2, bakery_address t3, (SELECT * FROM fv_bakeries WHERE user_id = ?) t4 WHERE t3.sido_name = ? and t3.sigg_name = ? and t3.emd_name = ? and t3.bakery_addr_id = t2.bakery_addr_id and t1.bakery_id = t2.bakery_id and t4.bakery_id = t2.bakery_id and DATE(t1.created_at) = DATE(now())`;
  let values = [user_id, sido_name, sigg_name, emd_name];
  return await db.query(connection, { query: query, values: values });
};

module.exports.getFvBakeryFeedsToday = async (connection, options) => {
  let query = `SELECT * FROM feeds t1, bakeries t2, (SELECT * FROM fv_bakeries WHERE user_id = ${options}) t3 WHERE t3.bakery_id = t2.bakery_id and t2.bakery_id = t1.bakery_id and DATE(t1.created_at) = DATE(now())`;
  return await db.query(connection, { query: query });
};

// 비회원 메인페이지 geolocation 참조할 가게 정보, 피드, 위도경도 불러오기
module.exports.getFeedsByGeoInfo = async (connection, options) => {
  let query = `SELECT t1.*, t2.bakery_name, t3.jibun_address, t3.road_address, t3.detail_address, t3.latitude, t3.longitude FROM feeds t1, bakeries t2, bakery_address t3 WHERE t2.bakery_addr_id = t3.bakery_addr_id and t2.bakery_id = t1.bakery_id`;
  return await db.query(connection, { query: query });
};
