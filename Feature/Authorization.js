// jwt 모듈 소환
const jwt = require("jsonwebtoken");

const ensureAuthorization = (req, res) => {
  try {
    const receivedJWT = req.headers.authorization;
    console.log("receivedJWT:", receivedJWT);

    if (receivedJWT) {
      const decodedJWT = jwt.verify(
        receivedJWT,
        process.env.JWT_ENCRIPTION_KEY
      );
      //{ foo: 'bar', iat: 1746283758 } iat(issued at):발행 시간

      console.log(decodedJWT);
      return parseInt(decodedJWT.id);
    } else {
      throw new ReferenceError("jwt must be provided");
    }
  } catch (err) {
    console.log(err.name);
    console.log(err.message);

    return err;
  }
};

module.exports = ensureAuthorization;
