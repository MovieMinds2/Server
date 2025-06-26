//함수의 모듈화

const { validationResult } = require("express-validator");

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

module.exports = validation;
