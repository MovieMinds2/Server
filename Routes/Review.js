const express = require("express");
// const { param, validationResult } = require("express-validator");
const reviewController = require("../Control/ReviewsController");
const router = express.Router();

// 리뷰 전체 조회
router.get("/", reviewController.getReviewsAll);


// 리뷰 등록
router.post("/", reviewController.insertReview);

//리뷰 삭제 
router.delete("/review", reviewController.deleteReview);

// 리뷰 개별 조회
router.post("/review", reviewController.getReviews);




//좋아요 삭제
router.delete("/likes", reviewController.likesDelete);

// 좋아요 추가
router.post("/likes", reviewController.likes);




module.exports = router;
