const {
  queryInsertReview,
  queryGetReview,
  queryInsertLikes,
  queryDeleteLikes,
  queryDeleteReview,
  querySeleteAll
} = require("../../DB/Query/QueryCommand");

const serviceInsertReview = async (reviewInfo) => {
  return await queryInsertReview(reviewInfo);
};

const serviceGetReview = async (reviewInfo) => {
  return await queryGetReview(reviewInfo);
};

const insertLikes = async (likesInfo) => {
  return await queryInsertLikes(likesInfo);
}

const deleteLikes =  async (likesInfo) => {
  return await queryDeleteLikes(likesInfo);
}

const serviceDeleteReview =  async (deleteInfo) => {
  return await queryDeleteReview(deleteInfo);
}

const serviceGetReviewsAll =  async (reviewInfo, userId) => {
  return await querySeleteAll(reviewInfo,userId);
}

module.exports = { serviceInsertReview, serviceGetReview,insertLikes, deleteLikes, serviceDeleteReview,serviceGetReviewsAll};
