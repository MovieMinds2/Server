const express = require("express");
// const { param, validationResult } = require("express-validator");
const userController = require("../Control/UsersController");
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

//함수의 모듈화
//미들웨어: express에서 req와 res 사이에서 실행되는 메소드
const validation = (req, res, next) => {
  const err = validationResult(req);

  //이중 부정 = 긍정 (불편함)
  if (err.isEmpty()) {
    next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      validateError: err.array(),
    });
  }
};

// body("password")
//   .notEmpty()
//   .isString()
//   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
//   .withMessage(
//     "총 8자 이상으로 작성해야 하며, 대문자 및 특수문자 1개를 반드시 포함해야 합니다."
//   ),

// 일반 로그인
router.post(
  "/login",
  [
    body("userId")
      .notEmpty()
      .isString()
      .withMessage("문자열 ID값을 입력해주세요."),
    validation,
  ],
  userController.login
);

// 소셜 로그인
router.post("/sign-up/social-login", userController.socialLogin);

module.exports = router;
