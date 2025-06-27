const {
  queryInsertReview,
  queryGetReview,
  queryInsertLikes,
  queryDeleteLikes
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

module.exports = { serviceInsertReview, serviceGetReview,insertLikes, deleteLikes};
