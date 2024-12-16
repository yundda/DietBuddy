// const models = require("../models/User");

exports.getUser = (req, res) => {
  res.render("index");
};

exports.getSetGoal = (req, res) => {
  res.render("settingGoal");
};

exports.getDailyInput = (req, res) => {
  res.render("user");
};

exports.getUserUpdate = (req, res) => {
  res.render("userUpdate");
};

exports.patchUser = (req, res) => {
  res.send("회원 정보 수정 완료");
};

exports.deleteUser = (req, res) => {
  res.send("회원 탈퇴 완료");
};
