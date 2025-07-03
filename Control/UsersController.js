const usersService = require("../Service/Users/UserService");
const { generateToken } = require("../Service/Users/Jwt");
const { StatusCodes } = require("http-status-codes");
const { ensureAuthorization, jwtError } = require("../Feature/Authorization");
const jwt = require("jsonwebtoken");

// 로그인
const login = async (req, res) => {

    const ip =
    req.headers['x-forwarded-for']?.split(',').shift() ||  // 프록시 또는 로드 밸런서 뒤일 경우
    req.socket?.remoteAddress ||                           // 일반적인 경우
    null;

  console.log('Client IP:', ip);
  
  try {
    const { userId } = req.body;

    const authToken = await usersService.login(userId);

    if (authToken) {
      //create token
      const userToken = generateToken(authToken);
      console.log("userToken:", userToken);

      res.cookie("token", userToken, {
      httpOnly:true,
      secure: true, // ✅ 반드시 설정
      sameSite:"none",
      maxAge: 1000 * 60 * 60 * 24, // ✅ 1일 = 86400000 밀리초
      });
      return res.status(StatusCodes.OK).send();
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).end({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    console.log("로그아웃");
    res.clearCookie("token", {
      httpOnly:true,
      secure: true, // ✅ 반드시 설정
      sameSite:"none",
    });
    return res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(`${error.code}:${error.message}`);
  }
};


module.exports = { login, logout };
