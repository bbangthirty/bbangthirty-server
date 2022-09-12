const db = require("../components/db");

module.exports.insertBakeryInfo = async (connection, options) => {
  let query = `INSERT INTO bakeries SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getBakeryListForEntry = async (connection, options) => {
  let query = `SELECT * FROM bakeries WHERE approve = "N"`;
  return await db.query(connection, { query: query });
};

module.exports.approve = async (connection, options) => {
  let query = `UPDATE bakeries SET approve = "Y" WHERE bakery_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.disApprove = async (connection, options) => {
  let query = `UPDATE bakeries SET approve = "N" WHERE bakery_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getBakeryInfo = async (connection, options) => {
  let query = `SELECT * FROM bakeries WHERE bakery_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
