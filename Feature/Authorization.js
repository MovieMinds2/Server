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
    }
  } catch (error) {
    throw error;
  }
};

const jwtError = (error, res) => {
  console.log(error);
  const MSG = `다시 로그인 하세요.`;
  if (error instanceof jwt.TokenExpiredError) {
    console.log("토큰 만료");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: `로그인 세션이 만료되었습니다. ${MSG}`,
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    console.log("잘못된 토큰값");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: `토큰값이 올바르지 않습니다. ${MSG}`,
    });
  }
  // ReferenceError
  else if (error instanceof ReferenceError) {
    console.log("토큰 없음");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: `토큰값이 존재하지 않습니다. ${MSG}`,
    });
  }
};

module.exports = { ensureAuthorization, jwtError };
