const {
  queryInsertReview,
  queryGetReview,
} = require("../../DB/Query/QueryCommand");

const serviceInsertReview = async (reviewInfo) => {
  return await queryInsertReview(reviewInfo);
};

const serviceGetReview = async (movieId) => {
  return await queryGetReview(movieId);
};
module.exports = { serviceInsertReview, serviceGetReview };
