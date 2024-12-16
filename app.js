const express = require("express");
const indexRouter = require("./routes/index");
const db = require("./models");
const app = express();
const port = 8081;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

app.use("/", indexRouter);

db.sequelize.sync({ force: true }).then((result) => {
  console.log("db 연결 성공");
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
