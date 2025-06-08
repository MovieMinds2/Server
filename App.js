const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/Users");
const cors = require("cors");
const corsOption = require("./cors");
//mysql2/promise connect()가 필요없는 자동 연결 방식
// mariadb.connet(); // 이건 mysql2 에서 가능

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Start Node.js for port ${process.env.PORT}`);
});

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
