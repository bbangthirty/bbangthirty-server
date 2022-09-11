const db = require("../components/db");

module.exports.getAreaList = async (connection, options) => {
  let query = `SELECT t2.sido_name, t2.sigg_name, t2.emd_name FROM my_areas t1, areas t2`;
  let values = [];
  if (options) {
    if (options.user_id) {
      query += ` WHERE t1.area_id = t2.area_id and t1.user_id = ?`;
      values.push(options.user_id);
    }
  }
  return await db.query(connection, { query: query, values: values });
};

module.exports.RegistAreaInfo = async (connection, options) => {
  let query = `INSERT INTO my_areas SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
