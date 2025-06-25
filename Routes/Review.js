const express = require("express");
// const { param, validationResult } = require("express-validator");
const reviewController = require("../Control/ReviewsController");
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { test } = require("../DB/Query/QueryCommand");
const router = express.Router();

// 리뷰 등록
router.post("/", reviewController.insertReview);

// 리뷰 조회
router.get("/:movieId", reviewController.getReviews);

module.exports = router;
