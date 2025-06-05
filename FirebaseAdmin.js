const admin = require("firebase-admin");

const auth = admin
  .initializeApp({
    credential: admin.credential.applicationDefault(),
  })
  .auth();

require("dotenv").config();

module.exports = auth;
