const db = require("../components/db");

module.exports.insertBakeryAddress = async (connection, options) => {
  let query = `INSERT INTO bakery_address SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
