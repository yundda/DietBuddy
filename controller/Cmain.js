// const models = require("../models/User");

exports.getIndex = (req, res) => {
  res.render("index");
};
exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postSignup = (req, res) => {
  res.send("회원가입 성공");
};
exports.postLogin = (req, res) => {
  res.send("로그인 성공");
};

exports.postLogout = (req, res) => {
  res.send("로그아웃 성공");
};
