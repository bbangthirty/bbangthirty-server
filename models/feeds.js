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

module.exports.getAreaFeedsToday = async (
  connection,
  sido_name,
  sigg_name,
  emd_name
) => {
  let query = `SELECT * FROM feeds t1, bakeries t2, bakery_address t3 WHERE t3.sido_name = ? and t3.sigg_name = ? and t3.emd_name = ? and t3.bakery_addr_id = t2.bakery_id and t1.bakery_id = t2.bakery_id and DATE(t1.created_at) = DATE(now())`;
  let values = [sido_name, sigg_name, emd_name];
  return await db.query(connection, { query: query, values: values });
};
