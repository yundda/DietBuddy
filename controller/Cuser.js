// const models = require("../models/User");

exports.main = (req, res) => {
  res.render("index");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getMypage = (req, res) => {
  res.render("mypage");
};

exports.getSetGoal = (req, res) => {
  res.render("settingGoal");
};

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.getUserUpdate = (req, res) => {
  res.render("userUpdate");
};
