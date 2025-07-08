const methodOverride = require("method-override");
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/User");
const reviewRouter = require("./Routes/Review");
const myPageRouter = require("./Routes/MyPage");

const cors = require("cors");
const corsOption = require("./Cors");
const morgan = require("morgan");

//mysql2/promise connect()가 필요없는 자동 연결 방식
// mariadb.connet(); // 이건 mysql2 에서 가능

const app = express();

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Start Node.js for port ${process.env.PORT}`);
});

app.use(cors(corsOption));
app.use(express.json());
// http 메소드 오버라이드  express.json() 뒤에 붙여야 가능
app.use(
  methodOverride((req) => {
    console.log("메소드 오버라이드");
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      console.log("method:", method);
      delete req.body._method; // _method는 제거
      return method;
    }
    return undefined;
  })
);

app.use(cookieParser());

app.use(morgan("combined"));

app.use("/users", userRouter);
app.use("/reviews", reviewRouter);
app.use("/mypage", myPageRouter);
