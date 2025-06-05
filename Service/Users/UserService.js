const {
  createUserWithEmailAndPassword,
  updateProfile,
} = require("firebase/auth");
const auth = require("../../FirebaseAdmin");

// 회원 가입
const signUp = async (nickname, email, password) => {
  try {
    const user = await auth.createUser({
      email: email,
      password: password,
      displayName: nickname,
    });

    return { id: user.uid, nickname: user.displayName };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, ":", errorMessage);
  }
};

// 소셜 로그인
const serviceSocialLogin = () => {
  const result = "소셜 로그인 성공";

  return result;
};

module.exports = { serviceSocialLogin, signUp };
