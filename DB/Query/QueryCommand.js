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

  // 존재 여부
  let sql = `select * from review where movie_id =? and user_id =?;`;
  let values = [movieId, userId];
  const results = await executeSql(sql, values);

  if (results.length === 0) {
    sql =
      "insert into review(movie_id,movie_title,user_id,nickname, rank_score, content) values (?,?,?,?,?,?);";

    values = [movieId, movieTitle, userId, nickname, rankScore, content];

    return await executeSql(sql, values);
  } else {
    return;
  }
};

//리뷰 조회
const queryGetReview = async (reviewInfo) => {
  const { movieId, userId } = reviewInfo;

  console.log("reviewInfo:", reviewInfo);

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
  `;
  reviewResult.reviews = await executeSql(sql, values);

  console.log(reviewResult);
  return reviewResult;
};

// 좋아요 추가
const queryInsertLikes = async (reviewInfo) => {
  const { movieId, reviewId, userId } = reviewInfo;
  const values = [movieId, reviewId, userId];
  console.log(values);
  let sql = `insert into likes(movie_id, review_id, user_id) values (?,?,?);`;
  return executeSql(sql, values);
};

// 좋아요 삭제
const queryDeleteLikes = async (reviewInfo) => {
  const { reviewId, userId } = reviewInfo;
  const values = [reviewId, userId];
  console.log(values);
  let sql = `delete from likes where review_id =? and user_id = ?;`;
  return executeSql(sql, values);
};

const queryDeleteReview = async (deleteInfo) => {
  const { movieId, reviewId, userId } = deleteInfo;
  const values = [reviewId, userId, movieId];

  console.log(values);

  let sql = `delete from review where id = ? and user_id=? and movie_id = ?;`;
  return executeSql(sql, values);
};

const querySeleteAll = async (deleteInfo, userId) => {
  console.log("userId:", userId);

  const review = {};
  const sort = deleteInfo.sort.toString(); //  "latest" | "oldest" | "likes_desc";
  const currentPage = parseInt(deleteInfo.currentPage);
  const limit = parseInt(deleteInfo.limit);

  // OFFSET
  const currentPageIndex = (currentPage - 1) * limit;
  const values = [userId, limit, currentPageIndex];

  let sql;
  // 개행문자 " " 주의
  console.log("sort:", sort);

  if (sort === "latest") {
    console.log("최신순");
    sql = `SELECT
	SQL_CALC_FOUND_ROWS r.*,
  COUNT(rl.user_id) AS like_count,
  EXISTS (
    SELECT 1
    FROM likes l
    WHERE l.review_id = r.id AND l.user_id = ? 
  ) AS isLike
FROM review r
LEFT JOIN likes rl ON r.id = rl.review_id
GROUP BY 
  r.id, r.user_id, r.nickname, r.content, r.rank_score, r.created_at
ORDER BY r.created_at DESC 
limit ? OFFSET ?; `;
  } else if (sort === "oldest") {
    console.log("오래된 순");
    sql = `SELECT
	SQL_CALC_FOUND_ROWS r.*,
  COUNT(rl.user_id) AS like_count,
  EXISTS (
    SELECT 1
    FROM likes l
    WHERE l.review_id = r.id AND l.user_id = ? 
  ) AS isLike
FROM review r
LEFT JOIN likes rl ON r.id = rl.review_id
GROUP BY 
  r.id, r.user_id, r.nickname, r.content, r.rank_score, r.created_at
ORDER BY r.created_at ASC 
limit ? OFFSET ?; `;
  }

  // "likes_desc";
  else {
    sql = `
      SELECT
	SQL_CALC_FOUND_ROWS r.*,
  COUNT(rl.user_id) AS like_count,
  EXISTS (
    SELECT 1
    FROM likes l
    WHERE l.review_id = r.id AND l.user_id =?
  ) AS isLike
FROM review r
LEFT JOIN likes rl ON r.id = rl.review_id
GROUP BY 
  r.id, r.user_id, r.nickname, r.content, r.rank_score, r.created_at
ORDER BY like_count DESC 
limit ? OFFSET ?;

      `;
  }

  review.reviews = await executeSql(sql, values);

  console.lg;

  sql = `select found_rows()`;

  const rows = await executeSql(sql);

  review.pagination = {
    currentPage: currentPage,
    totalCount: rows[0]["found_rows()"],
  };

  //   let sqlPaging = `LIMIT  ? OFFSET  ?`;

  // sql = `select found_rows()`; // 방금 출력된 행의 수를 가져오는 명령어

  // console.log(values);

  // let sql = `delete from review where id = ? and user_id=? and movie_id = ?;`

  return review;
};

const executeSql = async (sql, values) => {
  const [result, fields] = await mariadb.query(sql, values);
  return result;
};

module.exports = {
  test,
  queryInsertReview,
  queryGetReview,
  queryInsertLikes,
  queryDeleteLikes,
  queryDeleteReview,
  querySeleteAll,
};
