// const models = require("../models/User");
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
//비밀번호 찾기 페이지
//페이지 이름은 임시로 정한 것.
//나중에 비밀번호 페이지 만들어지면 바꾼다.
exports.getFindpw = (req, res) => {
  res.render("findPw");
};

//회원가입 controller
exports.postSignup = (req, res) => {
  try {
    //아이디(이메일) 중복체크
    const sameCheck = models.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (sameCheck) {
      //중복되는 이메일이 없을 경우
      const hashResult = hashSaltPw(req.body.pw);

      //회원 정보 추가
      models.User.create({
        email: req.body.email,
        pw: hashResult.hash,
        name: req.body.name,
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
      //중복되는 이메일이 있을 경우우
      console.log("중복 이메일 존재");
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
    //DB에 저장된 해시랑 솔트 값.
    const { pw: DBhash, salt: DBsalt } = findUser;

    if (findUser) {
      if (checkPw(req.body.pw, DBsalt, DBhash)) {
        req.session.user = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
        };
        // console.log("세션 저장 확인");
        // console.log(req.session.user);
        //세션이 잘 저장되었는지 확인.

        res.send({ isLogin: true });
      } else {
      }
    } else {
      res.send({ isLogin: false });
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
        // findPw: req.body.findPw,
      },
    });
    //만일 보안문자 내용이 겹치면 어떻게 하지?
    //이메일도 같이 보내게 하는 게 좋을 것 같다.

    if (findingPw.findPw === req.body.findPw) {
      console.log("회원 존재");
      res.send({ isFind: true, msg: "비밀번호 변경 페이지로 이동" });
    } else {
      console.log("회원 없음.");
      res.send({ isFind: false, msg: "해당 정보와 일치하는 회원이 존재하지 않습니다." });
    }
  } catch (err) {
    console.log("Cmain.js postFindpw : server error", err);
    res.status(500).send("Cmain.js postFindpw : server error");
  }
};
