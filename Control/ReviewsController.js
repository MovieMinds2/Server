const { StatusCodes } = require("http-status-codes");
const {
  serviceInsertReview,
  serviceGetReview,
} = require("../Service/Review/ReviewService");
const snakeToCamel = require("../Feature/convertCamel");
const { ensureAuthorization } = require("../Feature/Authorization");

const insertReview = async (req, res) => {
  const reviewInfo = req.body.newReview;
  console.log(reviewInfo);
  //db에 저장
  const result = await serviceInsertReview(reviewInfo);

  return res.status(StatusCodes.OK).json(result);
};

const getReviews = async (req, res) => {
  const movieId = req.params.movieId;
  const result = await serviceGetReview(movieId);
  const resultCamel = snakeToCamel(result);
  return res.status(StatusCodes.OK).json(resultCamel);
};

module.exports = { insertReview, getReviews };
