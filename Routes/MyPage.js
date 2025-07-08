const express = require("express");
const router = express.Router();
const myPageContoller = require("../Control/MyPageController");

// 내 리뷰 조회
router.get("/myreview", myPageContoller.getMyReviews);

router.put("/myreview", myPageContoller.updateMyReviews);

module.exports = router;
