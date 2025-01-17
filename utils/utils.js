const crypto = require("crypto");
const utils = {};

utils.calc_BMR = (gender, weight, height, age) => {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};
utils.calc_AMR = (BMR, activelevel) => {
  return Math.round(BMR * activelevel);
};

utils.calc_intake = (AMR, weight, goalWeight, period) => {
  return Math.round(AMR - ((weight - goalWeight) * 7000) / period);
};

utils.calc_protein = (gender, activelevel, dietgoal, weight) => {
  let calc_protein;
  if (gender === "male") {
    if (activelevel < 1.6) {
      switch (dietgoal) {
        case "Gain":
          calc_protein = weight * 2;
          break;
        case "Loss":
          calc_protein = weight * 1.8;
          break;
        case "Stay":
          calc_protein = weight * 1.8;
      }
    } else {
      switch (dietgoal) {
        case "Gain":
          calc_protein = weight * 2.2;
          break;
        case "Loss":
          calc_protein = weight * 2.0;
          break;
        case "Stay":
          calc_protein = weight * 1.8;
      }
    }
  } else if (gender === "female") {
    if (activelevel < 1.6) {
      switch (dietgoal) {
        case "Gain":
          calc_protein = weight * 1.7;
          break;
        case "Loss":
          calc_protein = weight * 1.5;
          break;
        case "Stay":
          calc_protein = weight * 1.5;
          break;
      }
    } else {
      switch (dietgoal) {
        case "Gain":
          calc_protein = weight * 1.8;
          break;
        case "Loss":
          calc_protein = weight * 1.65;
          break;
        case "Stay":
          calc_protein = weight * 1.5;
          break;
      }
    }
  }
  return Math.round(calc_protein);
};
utils.calc_carbo = (intake, dietgoal) => {
  let calc_carbo;
  switch (dietgoal) {
    case "Gain":
      calc_carbo = intake * 0.138;
      break;
    case "Loss":
      calc_carbo = intake * 0.13;
      break;
    case "Stay":
      calc_carbo = intake * 0.135;
      break;
  }
  return Math.round(calc_carbo);
};
utils.calc_fat = (intake, carbo, protein) => {
  return Math.round((intake - (carbo + protein) * 4) / 9);
};

utils.calc_cal = (carbo, protein, fat) => {
  return (carbo + protein) * 4 + fat * 9;
};

//비밀번호 암호화 함수
utils.hashSaltPw = (pw) => {
  const salt = crypto.randomBytes(16).toString("base64");
  const iteration = 100;
  const keylen = 64;
  const algorithm = "sha512";

  const hash = crypto
    .pbkdf2Sync(pw, salt, iteration, keylen, algorithm)
    .toString("base64");

  return { salt, hash };
};

//비밀번호 대조 함수
utils.checkPw = (inputPw, savedSalt, savedHash) => {
  const iteration = 100;
  const keylen = 64;
  const algorithm = "sha512";

  const hash = crypto
    .pbkdf2Sync(inputPw, savedSalt, iteration, keylen, algorithm)
    .toString("base64");

  return hash === savedHash;
};

module.exports = utils;
