const express = require("express");
// const { param, validationResult } = require("express-validator");
const userController = require("../Control/UsersController");

const router = express.Router();

//함수의 모듈화
//미들웨어: express에서 req와 res 사이에서 실행되는 메소드
// const validation = (req, res, next) => {
//   const err = validationResult(req);

//   //이중 부정 = 긍정 (불편함)
//   if (err.isEmpty()) {
//     next();
//   } else {
//     return res.status(400).json(err.array());
//   }
// };

// 일반 회원가입
router.post("/sign-up", userController.signUp);
// 일반 로그인
// 소셜 로그인
router.post("/sign-up/social-login", userController.socialLogin);

module.exports = router;
