const usersService = require("../Service/Users/UserService");
const { generateToken } = require("../Service/Users/Jwt");
const { StatusCodes } = require("http-status-codes");
const { ensureAuthorization, jwtError } = require("../Feature/Authorization");
const jwt = require("jsonwebtoken");

// 로그인
const login = async (req, res) => {
  try {
    const { userId } = req.body;

    const authToken = await usersService.login(userId);

    if (authToken) {
      //create token
      const userToken = generateToken(authToken);
      console.log("userToken:", userToken);

      res.cookie("token", userToken, {
        httpOnly: true,
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
      httpOnly: true,
    });
    return res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(`${error.code}:${error.message}`);
  }
};

const jwtTest = (req, res) => {
  try {
    const { token } = req.cookies; // 모든 쿠키 객체
    const userId = ensureAuthorization(token);

    return res.status(StatusCodes.Ok).end(userId);
  } catch (error) {
    jwtError(res, error);
  }
};

module.exports = { login, logout, jwtTest };
