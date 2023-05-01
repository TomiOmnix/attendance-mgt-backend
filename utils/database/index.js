const { createPool } = require("mysql");
require("dotenv").config();

// const db = createPool({
//   host: "localhost",
//   user: "root",
//   password: "tominiyi",
//   database: "attendanceManagement",
//   connectionLimit: 10,
// });

const db = createPool({
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully");
  connection.release();
});

module.exports = db;
