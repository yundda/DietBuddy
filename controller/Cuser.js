const models = require("../models");
const {
  calc_AMR,
  calc_BMR,
  calc_intake,
  calc_carbo,
  calc_protein,
  calc_fat,
} = require("../utils/utils");

exports.getUser = (req, res) => {
  res.render("user");
};

exports.getSetGoal = (req, res) => {
  res.render("settingGoal");
};

exports.getDailyIntake = (req, res) => {
  res.render("user");
};

exports.getUserUpdate = (req, res) => {
  res.render("userUpdate");
};

exports.patchUser = async (req, res) => {
  const { id } = req.session.user;
  // const { salt, hash } = cipherPw(req.body.pw);
  try {
    const patchUser = await models.User.update({
      name: req.body.name,
    });
    res.send("회원 정보 수정 완료");
  } catch (err) {
    console.log("Cuser.js deleteUser : server error", err);
    res.status(500).send("Cuser.js deleteUser : server error");
  }
};

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

/* req.session.user = {id, email, name} */

// [241218] 추가
// POST '/user/settingGoal
// 목표 설정 DB 저장 (create)
exports.postSetGoal = async (req, res) => {
  const { id: sessionId } = req.session.user;
  // gender value -> "male", "female"
  // activeLevel value -> 1.2 / 1.375 / 1.55 / 1.725
  // dietGoal value -> "근성장" / "체지방 감량" / "유지"
  const { weight, height, age, gender, activeLevel, goalWeight, period, dietGoal } =
    req.body;
  const calcedBMR = calc_BMR(gender, weight, height, age);
  const calcedAMR = calc_AMR(calcedBMR, activeLevel);
  const calcedIntake = calc_intake(calcedAMR, weight, goalWeight, period);
  const calcedCarbo = calc_carbo(calcedIntake, dietGoal);
  const calcedProtein = calc_protein(gender, activeLevel, dietGoal, weight);
  const calcedFat = calc_fat(calcedIntake, calcedCarbo, calcedProtein);
  try {
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
  const { mealtime, carbo, protein, fat, fiber } = req.body;
  try {
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
