const db = require("../components/db");

module.exports.albaDaegi = async (connection, options) => {
  let query = `INSERT INTO albas SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.albaConfirm = async (connection, options) => {
  let query = `UPDATE albas SET regist = "Y" WHERE bakery_id = ? and user_id = ?`;
  let values = [options.bakery_id, options.user_id];
  return await db.query(connection, { query: query, values: values });
};

module.exports.getDaegiList = async (connection, options) => {
  let query = `SELECT * FROM albas WHERE bakery_id = ? and regist = "N"`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getConfirmList = async (connection, options) => {
  let query = `SELECT * FROM albas WHERE bakery_id = ? and regist = "Y"`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.deleteAlbaInfo = async (connection, options) => {
  let query = `DELETE FROM albas WHERE alba_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
