const usersService = require("../Service/Users/UserService");
const { generateToken } = require("../Service/Users/Jwt");
const { StatusCodes } = require("http-status-codes");

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
      return res.status(StatusCodes.OK).end();
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).end({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(`${error.code}:${error.message}`);
  }
};

module.exports = { login, logout };
