const getConnection = require("../Config/Mariadb");

let mariadb;

(async () => {
  try {
    mariadb = await getConnection();
  } catch (err) {
    console.error(err);
  }
})();

const test = async () => {
  const sql = `select * from likes`;
  const [result, fields] = await mariadb.query(sql);

  console.log(result);
};

module.exports = { test };
