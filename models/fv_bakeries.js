const db = require("../components/db");

module.exports.getLikehist = async (connection, options) => {
  let query = `SELECT * FROM fv_bakeries WHERE user_id = ? and bakery_id = ?`;
  let values = [options.user_id, options.bakery_id];
  4;
  return await db.query(connection, { query: query, values: values });
};

module.exports.likeBakery = async (connection, options) => {
  let query = `INSERT INTO fv_bakeries SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.unLikeBakery = async (connection, options) => {
  let query = `DELETE FROM fv_bakeries WHERE user_id = ? and bakery_id = ?`;
  let values = [options.user_id, options.bakery_id];
  return await db.query(connection, { query: query, values: values });
};

// module.exports.getLikedBakeryList = async (connection, options) => {
//   let query = `SELECT * FROM fv_bakeries WHERE user_id = ?`;
//   let values = options;
//   4;
//   return await db.query(connection, { query: query, values: values });
// };
