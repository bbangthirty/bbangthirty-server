const express = require("express");
const router = express.Router();

// router.get("/", function (req, res, next) {
//   res.send("빵떠리 메인 페이지");
// });

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../components/db");

// router.get("/", async function (req, res, next) {
//   try {
//     const {} = req.body;
//     const connection = await db.getConnection();

//     await db.commit(connection);
//     res.status(200).json({ results });
//   } catch (err) {
//     console.log(" error : ", err);
//     next();
//   }
// });

// module.exports = router;

// ======================================================

// const db = require("../components/db");

// module.exports.getList = async (connection, options) => {
//   let query = `SELECT * FROM `;
//   let values = [];
//   if (options) {
//     if (options.temp) {
//       query += " WHERE = ?";
//       values.push(options.temp);
//     }
//   }
//   return await db.query(connection, { query: query, values: values });
// };
