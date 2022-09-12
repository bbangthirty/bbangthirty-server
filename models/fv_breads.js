const db = require("../components/db");

module.exports.registFvBread = async (connection, options) => {
  let query = `INSERT INTO fv_breads SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getFvBreadList = async (connection, options) => {
  let query = `SELECT * FROM fv_breads WHERE regist = "Y" and user_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.deleteFvBread = async (connection, options) => {
  let query = `UPDATE fv_breads SET regist = "N" WHERE fv_bread_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
