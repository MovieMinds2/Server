const auth = require("../../FirebaseAdmin");

const login = async (userId) => {
  try {
    const result = await auth.getUser(userId);
    return result.uid;
  } catch (error) {
    console.log(error.code, ":", error.message);
    throw new Error("에러 발생");
  }
};

// 소셜 로그인
const serviceSocialLogin = () => {
  const result = "소셜 로그인 성공";

  return result;
};

module.exports = { serviceSocialLogin, login };
