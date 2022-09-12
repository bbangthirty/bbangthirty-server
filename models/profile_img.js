const db = require("../components/db");

module.exports.insertImgPath = async (connection, options, reqUserID) => {
  let query = `UPDATE users SET profile_img = "${options}" WHERE user_id = ?`;
  let values = reqUserID;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getImgPath = async (connection, options) => {
  let query = `SELECT profile_img FROM users WHERE user_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.deleteImgPath = async (connection, options) => {
  let query = `UPDATE users SET profile_img = null WHERE user_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
