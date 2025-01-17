const express = require("express");
const session = require("express-session");
const db = require("./models");
const app = express();
const PORT = 8081;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

//세션 옵션 설정
app.use(
  session({
    secret: "password",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
  })
);

// 라우터 불러오기
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const mypageRouter = require("./routes/mypage");
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/mypage", mypageRouter);

// 404 페이지
app.get("*", (req, res) => {
  res.render("404page");
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
