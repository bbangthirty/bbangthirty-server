const db = require("../components/db");

module.exports.getUserList = async (connection, options) => {
  let query = `SELECT * FROM users`;
  let values = [];
  if (options) {
    if (options.user_id) {
      query += ` WHERE user_id = ?`;
      values.push(options.user_id);
    } else if (options.user_mail) {
      query += ` WHERE user_mail = ?`;
      values.push(options.user_mail);
    }
  }
  return await db.query(connection, { query: query, values: values });
};

module.exports.insertUserInfo = async (connection, options) => {
  let query = `INSERT INTO users SET ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.updateUserInfo = async (connection, options, reqUserID) => {
  let query = `UPDATE users SET ? WHERE user_id = ?`;
  let values = [options, reqUserID];
  return await db.query(connection, { query: query, values: values });
};

module.exports.deleteUserInfo = async (connection, options) => {
  let query = `UPDATE users SET deleted_at = now() WHERE user_id = ?`;
  let values = options.user_id;
  return await db.query(connection, { query: query, values: values });
};

module.exports.updateRoleAsOwner = async (connection, options) => {
  let query = `UPDATE users SET role = "owner" WHERE user_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};

module.exports.updateRoleAsUser = async (connection, options) => {
  let query = `UPDATE users SET role = "user" WHERE user_id = ?`;
  let values = options;
  return await db.query(connection, { query: query, values: values });
};
