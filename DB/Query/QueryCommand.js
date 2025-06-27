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
const queryGetReview = async (reviewInfo) => {

  const {movieId, userId} = reviewInfo;
  console.log("reviewInfo:",reviewInfo);

  let reviewResult = {}; 
  let values = [movieId];

  let sql = `select round(AVG(rank_score),2) as "averRank" from review where movie_id =? group by movie_id`;

  const averRank = await executeSql(sql, values);
  reviewResult.averRank = averRank[0].averRank; 

  values = [userId, movieId];

  sql = `
    SELECT 
  r.id,
  r.user_id,
  r.nickname,
  r.content,
  r.rank_score,
  COUNT(rl.user_id) AS like_count,
  EXISTS (
    SELECT 1
    FROM likes l
    WHERE l.review_id = r.id AND l.user_id = ?
  ) AS isLike,
    r.created_at
FROM review r
LEFT JOIN likes rl ON r.id = rl.review_id
WHERE r.movie_id = ?
GROUP BY 
  r.id, r.user_id, r.nickname, r.content, r.rank_score, r.created_at
ORDER BY r.created_at DESC;
  `
  reviewResult.reviews = await executeSql(sql, values);

  console.log(reviewResult);
  return reviewResult; 
};

// 좋아요 추가
const queryInsertLikes = async (reviewInfo)=> {
  const {movieId, reviewId, userId } = reviewInfo;
  const values = [movieId, reviewId, userId]; 
  console.log(values);
  let sql = `insert into likes(movie_id, review_id, user_id) values (?,?,?);`
  return executeSql(sql, values);
}

// 좋아요 삭제
const queryDeleteLikes = async (reviewInfo)=> {
  const { reviewId, userId } = reviewInfo;
  const values = [reviewId, userId]; 
  console.log(values);
  let sql = `delete from likes where review_id =? and user_id = ?;`
  return executeSql(sql, values);
}

const executeSql = async (sql, values) => {
  const [result, fields] = await mariadb.query(sql, values);
  return result;
};

module.exports = { test, queryInsertReview, queryGetReview,queryInsertLikes,queryDeleteLikes };
