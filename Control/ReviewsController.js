const { StatusCodes } = require("http-status-codes");
const {
  serviceInsertReview,
  serviceGetReview,
  insertLikes,
  deleteLikes,
  serviceDeleteReview,
  serviceGetReviewsAll,
} = require("../Service/Review/ReviewService");
const snakeToCamel = require("../Feature/convertCamel");
const { ensureAuthorization, jwtError } = require("../Feature/Authorization");
const { callGPT } = require("../Feature/ReviewFilter");

const insertReview = async (req, res) => {
  console.log("body:", req.body);

  // Authrization 체크
  try {
    const { token } = req.cookies; // 모든 쿠키 객체

    const userId = ensureAuthorization(token);
    console.log("Authrization:", userId);

    const reviewInfo = req.body.newReview;
    // 필터링
    const filterResult = JSON.parse(await callGPT(reviewInfo.content));
    console.log(filterResult);

    if (filterResult.result === "nonPass") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Bad_Content",
        filterResult: "nonPass",
        reason: "욕설 포함",
      });
    }

    //db에 저장
    const result = await serviceInsertReview(reviewInfo);

    console.log("result:", result);

    if (result) {
      return res.status(StatusCodes.OK).json(result);
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Duplication_Review" });
    }
  } catch (error) {
    jwtError(error, res);
    return;
  }
};

const getReviews = async (req, res) => {
  const reviewInfo = req.body;
  const result = await serviceGetReview(reviewInfo);
  console.log("result:", result);
  const resultCamel = snakeToCamel(result);
  console.log("resultCamel:", resultCamel);

  return res.status(StatusCodes.OK).json(resultCamel);
};

const getReviewsAll = async (req, res) => {
  const reviewInfo = req.query;
  const { userId } = req.body;

  const result = await serviceGetReviewsAll(reviewInfo, userId);

  const resultCamel = snakeToCamel(result);
  console.log("resultCamel:", resultCamel);

  return res.status(StatusCodes.OK).json(resultCamel);
};

const likes = async (req, res) => {
  try {
    console.log("좋아요 등록");
    const { token } = req.cookies; // 모든 쿠키 객체

    const userId = ensureAuthorization(token);
    console.log("Authrization:", userId);
    const result = await insertLikes(req.body);
    if (result.affectedRows > 0) {
      res.status(StatusCodes.OK).end();
    }
  } catch (error) {
    jwtError(error, res);
    return;
  }
};

const likesDelete = async (req, res) => {
  try {
    const { token } = req.cookies; // 모든 쿠키 객체

    const userId = ensureAuthorization(token);
    console.log("Authrization:", userId);
    console.log("좋아요 삭제");

    const result = await deleteLikes(req.body);
    if (result.affectedRows > 0) {
      res.status(StatusCodes.OK).end();
    }
  } catch (error) {
    jwtError(error, res);
    return;
  }
};

const deleteReview = async (req, res) => {
  try {
    const { token } = req.cookies; // 모든 쿠키 객체

    const userId = ensureAuthorization(token);
    console.log("Authrization:", userId);
    console.log("리뷰 삭제");

    const deleteInfo = {
      movieId: req.body.movieId,
      userId,
      reviewId: req.body.reviewId,
    };

    const result = await serviceDeleteReview(deleteInfo);

    if (result.affectedRows > 0) {
      res.status(StatusCodes.OK).end();
    }
  } catch (error) {
    jwtError(error, res);
    return;
  }
};

module.exports = {
  insertReview,
  getReviews,
  likes,
  likesDelete,
  deleteReview,
  getReviews,
  getReviewsAll,
};
