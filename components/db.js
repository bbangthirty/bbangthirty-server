const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: process.env.MYSQL_LIMIT,
});

module.exports.getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      resolve(connection);
    });
  });
};

module.exports.beginTransaction = (connection) => {
  return new Promise((resolve, reject) => {
    connection.beginTransaction(function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports.commit = (connection) => {
  return new Promise((resolve, reject) => {
    connection.commit(function (err) {
      if (err) reject(this.rollback(connection));
      else {
        connection.release();
        resolve();
      }
    });
  });
};

module.exports.rollback = (connection) => {
  return new Promise((resolve, reject) => {
    connection.rollback((err) => {
      if (err) reject(err);
      else {
        connection.release();
        resolve();
      }
    });
  });
};

module.exports.query = (connection, options) => {
  return new Promise((resolve, reject) => {
    connection.query(
      options.query,
      options.values,
      function (error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};
