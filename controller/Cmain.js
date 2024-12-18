// const models = require("../models/User");
const models = require("../models/index");
const crypto = require("crypto");

exports.getIndex = (req, res) => {
  res.render("index");
};
exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

//회원가입 controller
exports.postSignup = (req, res) => {
  //비밀번호를 암호화 한 뒤
  //솔트 값과 해시 코드를 반환하는 함수
  function cipherPw(pw) {
    const salt = crypto.randomBytes(16).toString("base64");
    const iteration = 100;
    const keylen = 64;
    const algorithm = "sha512";

    const hash = crypto
      .pdkdf2Sync(pw, salt, iteration, keylen, algorithm)
      .toString("base64");

    return { salt, hash };
  }

  const { salt, hash } = cipherPw(req.body.pw);

  //회원 정보 추가
  models.User.create({
    email: req.body.email,
    pw: hash,
    name: req.body.name,
    findPw: req.body.findPw,
    salt: salt,
  }).then((result) => {
    if (result) {
      res.send({ isCreate: true });
    } else {
      res.send({ isCreate: false });
    }
  });
};

//로그인 controller
exports.postLogin = async (req, res) => {
  try {
    const findUser = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (findUser) {
      req.session.user = {
        id: findUser.id,
        sessionName: findUser.name,
        sessionEmail: findUser.email,
      };

      res.render("user", { data: req.session.user, isLogin: true });
    } else {
      res.send({ isLogin: false });
    }
  } catch (err) {
    console.log(err);
  }
};

//로그아웃 controller
exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;

    res.send({ isOut: true });
  });
};
