const db = require("../components/db");

// 법정동 DB(zipcode 테이블) 추려서 areas 테이블에 넣어줌
// 넣고 나서 zipcode 테이블은 삭제 - 데이터가 너무 커서!
module.exports.insertJibunList = async (connection, options) => {
  let query = `INSERT INTO areas(bcode, sido_name, sigg_name, emd_name) SELECT * FROM zipcode GROUP BY sido_name, sigg_name, emd_name`;
  return await db.query(connection, { query: query });
};

// 동네검색 기능
module.exports.areaListByName = async (connection, options) => {
  let query = `SELECT area_id, CONCAT(sido_name," ",sigg_name," ",emd_name)  AS area FROM areas`;
  let values = [];
  if (options) {
    if (options.areaName) {
      query += ` WHERE CONCAT(sido_name," ",sigg_name," ",emd_name) REGEXP ?`;
      values.push(options.areaName);
    }
  }
  return await db.query(connection, { query: query, values: values });
};
