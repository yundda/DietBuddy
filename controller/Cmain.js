const models = require("../models/index");

const { hashSaltPw, checkPw } = require("../utils/utils");

exports.getIndex = (req, res) => {
  res.render("index");
};
exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.getLogin = (req, res) => {
  res.render("login");
};
exports.getService = (req, res) => {
  res.render("customerService_before_login");
};
exports.getUserService = (req, res) => {
  res.render("customerService");
};
exports.getFindpw = (req, res) => {
  res.render("findPw");
};

//회원가입 controller
exports.postSignup = async (req, res) => {
  try {
    const sameCheck = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!sameCheck) {
      const hashResult = hashSaltPw(req.body.pw);

      models.User.create({
        email: req.body.email,
        pw: hashResult.hash,
        name: req.body.name,
        pwQuestion: req.body.pwQuestion,
        findPw: req.body.findPw,
        salt: hashResult.salt,
      }).then((result) => {
        if (result) {
          res.send({ isCreate: true });
        } else {
          res.send({ isCreate: false });
        }
      });
    } else {
      res.send({ msg: "이 이메일로 가입한 회원이 이미 있습니다." });
    }
  } catch (err) {
    console.log("Cmain.js postSignup : server error", err);
    res.status(500).send("Cmain.js postSignup : server error");
  }
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
      const { pw: DBhash, salt: DBsalt } = findUser;
      if (checkPw(req.body.pw, DBsalt, DBhash)) {
        req.session.user = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
        };

        res.send({ isLogin: true });
      } else if (!checkPw(req.body.pw, DBsalt, DBhash)) {
        res.send({ isLogin: false, msg: "비밀번호가 틀렸습니다." });
      }
    } else if (findUser === null) {
      res.send({ isLogin: false, msg: "존재하지 않는 이메일입니다." });
    }
  } catch (err) {
    console.log("Cmain.js postLogin : server error", err);
    res.status(500).send("Cmain.js postLogin : server error");
  }
};

//비밀번호 찾기 controller
exports.postFindpw = async (req, res) => {
  try {
    const findingPw = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const { pwQuestion, findPw } = findingPw;

    if (findPw === req.body.findPw && pwQuestion === req.body.pwQuestion) {
      req.session.chgPw = {
        id: findingPw.id,
      };
      res.send({ isFind: true });
    } else {
      res.send({ isFind: false, msg: "해당 정보와 일치하는 회원이 존재하지 않습니다." });
    }
  } catch (err) {
    console.log("Cmain.js postFindpw : server error", err);
    res.status(500).send("Cmain.js postFindpw : server error");
  }
};
