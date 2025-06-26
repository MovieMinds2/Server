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

// 리뷰 등록
const queryInsertReview = async (reviewInfo) => {
  const { movieId, movieTitle, userId, nickname, rankScore, content } =
    reviewInfo;

  console.log("결과:", {
    movieId,
    movieTitle,
    userId,
    nickname,
    rankScore,
    content,
  });

  const sql =
    "insert into review(movie_id,movie_title,user_id,nickname, rank_score, content) values (?,?,?,?,?,?);";
  const values = [movieId, movieTitle, userId, nickname, rankScore, content];

  return await executeSql(sql, values);
};

//리뷰 조회
const queryGetReview = async (movieId) => {
  console.log(movieId);
  const sql =
    "select user_id, nickname, content,rank_score,created_at  from review where movie_id =?";
  const values = [movieId];

  return await executeSql(sql, values);
};

const executeSql = async (sql, values) => {
  const [result, fields] = await mariadb.query(sql, values);
  return result;
};

module.exports = { test, queryInsertReview, queryGetReview };
