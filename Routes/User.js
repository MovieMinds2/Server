const express = require("express");
// const { param, validationResult } = require("express-validator");
const userController = require("../Control/UsersController");
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { test } = require("../DB/Query/QueryCommand");
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

// 로그인
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

// 로그아웃
router.post("/logout", userController.logout);

// jwt 유효성 체크
router.post("/jwt", userController.jwtTest);

router.post("/test", (req, res) => {
  test();
});

module.exports = router;
