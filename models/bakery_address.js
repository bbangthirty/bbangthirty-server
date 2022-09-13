const db = require("../components/db");

module.exports.insertBakeryAddress = async (connection, options) => {
  let query = `INSERT INTO bakery_address SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.updateBakeryAddress = async (connection, options) => {
  let query = `UPDATE bakery_address SET ? WHERE bakery_addr_id = ?`;
  let values = [options, options.bakery_addr_id];
  return await db.query(connection, { query: query, values: values });
};
