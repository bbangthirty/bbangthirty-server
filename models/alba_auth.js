const db = require("../components/db");

module.exports.insertTokenData = async (connection, options) => {
  let query = `INSERT INTO alba_auth SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getTokenData = async (connection, options) => {
  let query = "SELECT * FROM alba_auth WHERE token = ?";
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
