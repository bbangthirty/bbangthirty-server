const db = require("../components/db");

module.exports.getAreaList = async (connection, options) => {
  let query = `SELECT t1.*, t2.sido_name, t2.sigg_name, t2.emd_name FROM my_areas t1, areas t2`;
  let values = [];
  if (options) {
    if (options.user_id) {
      query += ` WHERE t1.area_id = t2.area_id and t1.user_id = ?`;
      values.push(options.user_id);
    }
  }
  return await db.query(connection, { query: query, values: values });
};

module.exports.registfirstArea = async (connection, options) => {
  let query = `INSERT INTO my_areas SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.deleteMyAreaInfo = async (connection, options) => {
  let query = `DELETE FROM my_areas WHERE my_area_id = ?`;
  let values = options.my_area_id;
  return await db.query(connection, { query: query, values: values });
};

module.exports.getRegistAreaInfo = async (connection, options) => {
  let query = `SELECT * FROM my_areas WHERE user_id =?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.registSecondArea = async (connection, options) => {
  let query = `INSERT INTO my_areas(user_id, area_id, fixed_area) VALUES(${options.user_id}, ${options.area_id}, "N")`;
  return await db.query(connection, { query: query });
};

module.exports.updateFixedArea = async (connection, options) => {
  let query = `UPDATE my_areas SET fixed_area = "Y" WHERE my_area_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
