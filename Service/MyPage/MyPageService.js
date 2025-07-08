const { queryGetMyReview, queryPutReview } = require("../../DB/Query/QueryCommand");

const serviceGetMyReview = async (userId) => {
  return await queryGetMyReview(userId);
};

const serviceUpdateMyReview = async (reviewInfo) => {
  return await queryPutReview(reviewInfo);
};

module.exports = { serviceGetMyReview, serviceUpdateMyReview };
