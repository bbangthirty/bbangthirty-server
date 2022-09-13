const db = require("../components/db");

module.exports.registFeed = async (connection, options) => {
  let query = `INSERT INTO feeds SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getTodayFeedInfo = async (connection, options) => {
  let query = `SELECT * FROM feeds WHERE DATE(created_at) = DATE(now()) `;
  return await db.query(connection, { query: query });
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
