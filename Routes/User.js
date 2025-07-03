const express = require("express");
// const { param, validationResult } = require("express-validator");
const userController = require("../Control/UsersController");
const { body, validationResult } = require("express-validator");;
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

module.exports = router;
