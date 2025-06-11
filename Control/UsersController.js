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
        // js파일로 접근 불가
        httpOnly: true,
      });
      return res.status(StatusCodes.OK).end();
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).end({ error: error.message });
  }
};

module.exports = { login };
