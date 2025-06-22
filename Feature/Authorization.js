// jwt 모듈 소환
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const ensureAuthorization = (token) => {
  try {
    console.log("receivedJWT:", token);

    if (token) {
      const decodedJWT = jwt.verify(token, process.env.JWT_ENCRIPTION_KEY);
      //{ foo: 'bar', iat: 1746283758 } iat(issued at):발행 시간

      console.log(decodedJWT);
      return decodedJWT.id;
    } else {
      throw new ReferenceError("jwt must be provided");
    }
  } catch (err) {
    console.log(err.name, ":", err.message);
    throw err;
  }
};

const jwtError = (res, error) => {
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요.",
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "토큰값이 올바르지 않습니다. ", // 토큰값을 잘못 입력했기에 bad request
    });
  }
};

module.exports = { ensureAuthorization, jwtError };
