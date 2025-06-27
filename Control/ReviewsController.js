const { StatusCodes } = require("http-status-codes");
const {
  serviceInsertReview,
  serviceGetReview,
  insertLikes,
  deleteLikes,
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
  const reviewInfo  = req.body; 
  const result = await serviceGetReview(reviewInfo);
  const resultCamel = snakeToCamel(result);
  console.log("resultCamel:", resultCamel);

  return res.status(StatusCodes.OK).json(resultCamel);
};

const likes = async (req,res)=>{
  console.log("좋아요 등록");
  
  const result = await insertLikes(req.body);
  if(result.affectedRows>0)
  {
    res.status(StatusCodes.OK).end();
  }
  
}

const likesDelete = async (req,res)=>{
  console.log("좋아요 삭제");
  
  const result = await deleteLikes(req.body);
  if(result.affectedRows>0)
  {
    res.status(StatusCodes.OK).end();
  }
  
}

module.exports = { insertReview, getReviews,likes, likesDelete };
