const db = require("../components/db");

module.exports.getList = async (connection, options) => {
  let query = `SELECT * FROM `;
  let values = [];
  if (options) {
    if (options.temp) {
      query += " WHERE = ?";
      values.push(options.temp);
    }
  }
  return await db.query(connection, { query: query, values: values });
};
