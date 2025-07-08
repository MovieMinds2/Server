const {
  serviceGetMyReview,
  serviceUpdateMyReview,
} = require("../Service/MyPage/MyPageService");

const { StatusCodes } = require("http-status-codes");

const snakeToCamel = require("../Feature/convertCamel");

const { ensureAuthorization, jwtError } = require("../Feature/Authorization");

const getMyReviews = async (req, res) => {
  try {
    const { token } = req.cookies; // 모든 쿠키 객체
    const userId = ensureAuthorization(token);

    const myReview = await serviceGetMyReview(userId);
    const camelMyReview = snakeToCamel(myReview);
    res.status(StatusCodes.OK).json(camelMyReview);
  } catch (error) {
    jwtError(error, res);
  }
};

const updateMyReviews = async (req, res) => {
  try {
    const { token } = req.cookies; // 모든 쿠키 객체
    const userId = ensureAuthorization(token);
    console.log("userId:", userId);

    const result = await serviceUpdateMyReview(req.body);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    jwtError(error, res);
  }
};

module.exports = { getMyReviews, updateMyReviews };
