const db = require("../components/db");

module.exports.getList = async (connection, options) => {
  let query = `SELECT * FROM users`;
  let values = [];
  if (options) {
    if (options.user_id) {
      query += " WHERE user_id = ?";
      values.push(options.user_id);
    } else if (options.user_idx) {
      query += " WHERE user_idx = ?";
      values.push(options.user_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};
