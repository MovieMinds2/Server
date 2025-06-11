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

module.exports = { login };
