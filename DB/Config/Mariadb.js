const mysql = require("mysql2/promise");
require("dotenv").config();

const getConnection = async () => {
  // 프로미스 버전으로 await 적용
  const conn = await mysql.createConnection({
    host: process.env.AWS_RDS_HOST,
    user: process.env.AWS_RDS_USER,
    password: process.env.AWS_RDS_PASSWORD,
    port: process.env.AWS_RDS_PORT,
    database: process.env.AWS_RDS_DATABASE,
    dateStrings: true,
  });

  return conn;
};

module.exports = getConnection;
