const express = require("express");
// const { param, validationResult } = require("express-validator");
const userController = require("../Control/UsersController");
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { test } = require("../DB/Query/QueryCommand");
const validation = require("../Feature/Validation");
const router = express.Router();

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

module.exports = router;
