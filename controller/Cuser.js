const models = require("../models");
const {
  calc_AMR,
  calc_BMR,
  calc_intake,
  calc_carbo,
  calc_protein,
  calc_fat,
  hashSaltPw,
} = require("../utils/utils");

exports.getUser = async (req, res) => {
  // 세션 검증 후 isSettingGoal true/false에 따라서 mypage before/after로 나누기
  try {
    const { id: sessionId } = req.session.user;
    if (id) {
      const userGoal = models.UserGoal.findOne({
        where: {
          id: sessionId,
        },
      });
      res.render("user", { isSettingGoal: true, userGoal });
    } else {
      res.render("user", { isSettingGoal: false });
    }
  } catch (err) {
    console.log("Cuser.js patchUser : server error", err);
    res.status(500).send("Cuser.js patchUser : server error");
  }
};

exports.getSetGoal = (req, res) => {
  res.render("settingGoal");
};

// exports.getDailyIntake = (req, res) => {
//   res.render("user");
// };

exports.getUserUpdate = (req, res) => {
  res.render("userUpdate");
};

// 회원 정보 수정 PATCH '/user/patch'
exports.patchUser = async (req, res) => {
  try {
    const { id: sessionId } = req.session.user;
    const { salt, hash } = hashSaltPw(req.body.pw);
    const patchResult = await models.User.update(
      {
        name: req.body.name,
        pw: hash,
        salt: salt,
      },
      {
        where: {
          id: sessionId,
        },
      }
    );
    res.send("회원 정보 수정 완료");
  } catch (err) {
    console.log("Cuser.js patchUser : server error", err);
    res.status(500).send("Cuser.js patchUser : server error");
  }
};

// 회원 탈퇴 DELETE '/user'
exports.deleteUser = async (req, res) => {
  try {
    const deleteResult = await models.User.destroy({
      where: {
        email: req.session.user.email,
      },
    });

    if (deleteResult) {
      res.send({ isDelete: true });
    } else {
      res.send({ isDelete: false });
    }
  } catch (err) {
    console.log("Cuser.js deleteUser : server error", err);
    res.status(500).send("Cuser.js deleteUser : server error");
  }
};

/* req.session.user = {id : ~, email : ~, name : ~} */

// POST '/user/settingGoal
// 유효성 검증 후 목표 DB 저장
exports.postSetGoal = async (req, res) => {
  // gender value -> "male", "female"
  // activeLevel value -> 1.2 / 1.375 / 1.55 / 1.725
  // dietGoal value -> "근성장" / "체지방 감량" / "유지"
  try {
    const { id: sessionId } = req.session.user;
    const { weight, height, age, gender, activeLevel, goalWeight, period, dietGoal } =
      req.body;
    const calcedBMR = calc_BMR(gender, weight, height, age);
    const calcedAMR = calc_AMR(calcedBMR, activeLevel);
    const calcedIntake = calc_intake(calcedAMR, weight, goalWeight, period);
    const calcedCarbo = calc_carbo(calcedIntake, dietGoal);
    const calcedProtein = calc_protein(gender, activeLevel, dietGoal, weight);
    const calcedFat = calc_fat(calcedIntake, calcedCarbo, calcedProtein);
    // 목표 재설정인지 초기 설정인지
    const checkGoal = await models.UserGoal.findOne({
      where: {
        id: sessionId,
      },
    });
    if (checkGoal) {
      const goalResult = await models.UserGoal.update(
        {
          weight: weight,
          height: height,
          age: age,
          gender: gender,
          activeLevel: activeLevel,
          goalWeight: goalWeight,
          period: period,
          dietGoal: dietGoal,
          BMR: calcedBMR,
          AMR: calcedAMR,
          recomIntake: calcedIntake,
          recomCarbo: calcedCarbo,
          recomProtein: calcedProtein,
          recomFat: calcedFat,
        },
        {
          where: {
            id: sessionId,
          },
        }
      );
    } else {
      const goalResult = await models.UserGoal.create(
        {
          weight: weight,
          height: height,
          age: age,
          gender: gender,
          activeLevel: activeLevel,
          goalWeight: goalWeight,
          period: period,
          dietGoal: dietGoal,
          BMR: calcedBMR,
          AMR: calcedAMR,
          recomIntake: calcedIntake,
          recomCarbo: calcedCarbo,
          recomProtein: calcedProtein,
          recomFat: calcedFat,
        },
        {
          where: {
            id: sessionId,
          },
        }
      );
    }
    res.send("유저 목표 DB 저장 성공");
  } catch (err) {
    console.log("Cuser.js postSetGoal : server error", err);
    res.status(500).send("Cuser.js postSetGoal : server error");
  }
};

// POST '/user/dailyIntake'
// 섭취량 DB 저장 (create)
exports.postIntake = async (req, res) => {
  // req.body or form 데이터
  // mealtime value -> "breakfast", "lunch", "dinner", "btwmeal"
  try {
    const { mealtime, carbo, protein, fat, fiber } = req.body;
    const intakeResult = await models.Intake.create(
      {
        mealtime: mealtime,
        carbo: carbo,
        protein: protein,
        fat: fat,
        fiber: fiber,
      },
      {
        where: {
          id: sessionId,
        },
      }
    );
    res.send("유저 섭취량 DB 저장 성공");
  } catch (err) {
    console.log("Cuser.js postIntake : server error", err);
    res.status(500).send("Cuser.js postIntake : server error");
  }
};

// // POST '/user/dailyIntake'
// // 섭취량 DB 저장 (create)
// exports.postIntake =  async (req,res)=>{
//   try{
//     const Result = await models
//   } catch (err) {
//     console.log("Cuser.js postIntake : server error", err);
//     res.status(500).send("Cuser.js postIntake : server error");
//   }
// }
