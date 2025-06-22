// jwt 모듈 소환
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  try {
    const token = jwt.sign(
      {
        id: `${userId}`,
      },
      // 개인키
      process.env.JWT_ENCRIPTION_KEY,

      // 유효기간 설정
      {
        expiresIn: "3s", //s:초 m:분 ,h: 시간
        issuer: "admin", //발행한 사람
      }
    );

    return token;
  } catch (error) {
    console.log(error.code, ":", error.message);
  }
};

module.exports = { generateToken };
