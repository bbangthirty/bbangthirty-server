const db = require("../components/db");

module.exports.registFvBread = async (connection, options) => {
  let query = `INSERT INTO fv_breads SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getFvBreadList = async (connection, options) => {
  let query = `SELECT * FROM fv_breads WHERE user_id = ? and deleted_at is NULL`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.deleteFvBread = async (connection, options) => {
  let query = `UPDATE fv_breads SET deleted_at = now() WHERE fv_bread_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

// 삭제했던 피자빵 목록 보여주기
module.exports.getDeletedFvBreadList = async (connection, options) => {
  let query = `SELECT * FROM fv_breads WHERE user_id = ? and deleted_at is not NULL GROUP BY bread_name`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
