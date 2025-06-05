const usersService = require("../Service/Users/UserService");
const { generateToken } = require("../Service/Users/Jwt");
const { StatusCodes } = require("http-status-codes");

// 회원가입
const signUp = async (req, res) => {
  const { nickname, email, password } = req.body;
  // firebase 유저 불러오기
  const user = await usersService.signUp(nickname, email, password);

  // create token
  const userToken = generateToken(user.id);

  res.cookie("token", userToken, { httpOnly: true });

  return res.status(StatusCodes.OK).json({
    nickname: user.nickname,
  });
};

// 소셜 로그인(파이어 베이스)
const socialLogin = (req, res) => {
  const result = usersService.serviceSocialLogin();

  res.status(200).json(result);
};

module.exports = { socialLogin, signUp };
