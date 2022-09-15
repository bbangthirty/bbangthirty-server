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
  let query = `SELECT t1.*, t2.jibun_address, t2.road_address, t2.detail_address FROM bakeries t1, bakery_address t2 WHERE t1.bakery_id = ? and t1.bakery_addr_id = t2.bakery_addr_id`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getOwnerBakeryList = async (connection, options) => {
  let query = `SELECT * FROM bakeries WHERE approve = "Y" and user_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.updateBakeryInfo = async (connection, options) => {
  let query = `UPDATE bakeries SET ? WHERE bakery_id = ?`;
  let values = [options, options.bakery_id];
  return await db.query(connection, { query: query, values: values });
};
