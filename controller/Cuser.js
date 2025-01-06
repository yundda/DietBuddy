const { Op, Sequelize } = require("sequelize");
const models = require("../models");
const {
  calc_AMR,
  calc_BMR,
  calc_intake,
  calc_carbo,
  calc_protein,
  calc_fat,
  calc_cal,
  hashSaltPw,
} = require("../utils/utils");

exports.getSetGoal = (req, res) => {
  try {
    if (req.session.user) {
      res.render("settingGoal");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log("Cuser.js getSetGoal : server error", err);
    res.status(500).send("Cuser.js getSetGoal : server error");
  }
};

// 회원 정보 수정 페이지 GET '/user/patch'
exports.getUserUpdate = async (req, res) => {
  try {
    if (req.session.user) {
      const { id: sessionId } = req.session.user;
      const patchUser = await models.User.findOne({
        where: { id: sessionId },
      });
      res.render("userUpdate", {
        name: patchUser.dataValues.name,
        email: patchUser.dataValues.email,
      });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log("Cuser.js getUserUpdate : server error", err);
    res.status(500).send("Cuser.js getUserUpdate : server error");
  }
};
// 비밀번호 수정 GET '/user/pwUpdate
exports.getPwUpdate = async (req, res) => {
  try {
    if (!req.session.user) {
      res.render("pwUpdate");
    } else {
      res.redirect("/mypage");
    }
  } catch (err) {
    console.log("Cuser.js getPwUpdate : server error", err);
    res.status(500).send("Cuser.js getPwUpdate : server error");
  }
};

// 회원 정보 수정 PATCH '/user/patch'
exports.patchUser = async (req, res) => {
  try {
    const { id: sessionId } = req.session.user;
    console.log(req.body);
    let patchResult;
    if (req.body.pw) {
      const { salt, hash } = hashSaltPw(req.body.pw);
      patchResult = await models.User.update(
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
    } else {
      patchResult = await models.User.update(
        {
          name: req.body.name,
        },
        {
          where: {
            id: sessionId,
          },
        }
      );
    }
    if (patchResult[0] > 0) {
      const afterPatch = await models.User.findOne({
        where: {
          id: req.session.user.id,
        },
      });
      req.session.user = {
        id: afterPatch.id,
        name: afterPatch.name,
        email: afterPatch.email,
      };
      res.send({ isSuccess: true });
    } else {
      res.send({ isSuccess: false });
    }
  } catch (err) {
    console.log("Cuser.js patchUser : server error", err);
    res.status(500).send("Cuser.js patchUser : server error");
  }
};

// 비밀번호 재설정 PATCH '/user/patchPw'
exports.patchPw = async (req, res) => {
  try {
    const { id: sessionId } = req.session.chgPw;
    const { salt, hash } = hashSaltPw(req.body.pw);
    const patchPwResult = await models.User.update(
      {
        pw: hash,
        salt: salt,
      },
      {
        where: {
          id: sessionId,
        },
      }
    );
    if (patchPwResult[0] > 0) {
      res.send({ isSuccess: true });
    } else {
      res.send({ isSuccess: false });
    }
  } catch (err) {
    console.log("Cuser.js patchPw : server error", err);
    res.status(500).send("Cuser.js patchPw : server error");
  }
};

// 회원 탈퇴 DELETE '/user'
exports.deleteUser = async (req, res) => {
  try {
    const { id: sessionId } = req.session.user;
    const deleteResult = await models.User.destroy({
      where: {
        id: sessionId,
      },
    });
    if (sessionId) {
      req.session.destroy((err) => {
        if (err) throw err;
      });
    }
    if (Boolean(deleteResult)) {
      res.send({ isDelete: true });
    } else {
      res.send({ isDelete: false });
    }
  } catch (err) {
    console.log("Cuser.js deleteUser : server error", err);
    res.status(500).send("Cuser.js deleteUser : server error");
  }
};

// POST '/user/settingGoal
// 유효성 검증 후 목표 DB 저장
exports.postSetGoal = async (req, res) => {
  try {
    console.log(req.body);
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
          id: sessionId,
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
          id: sessionId,
        },
        {
          where: {
            id: sessionId,
          },
        }
      );
    }
    res.send("목표 설정 완료");
  } catch (err) {
    console.log("Cuser.js postSetGoal : server error", err);
    res.status(500).send("Cuser.js postSetGoal : server error");
  }
};

// POST '/user/dailyIntake'
// 섭취량 DB 저장 (create)
exports.postIntake = async (req, res) => {
  // ⭐️ createdAt에 선택 날짜 담아서 보내주기!
  try {
    const { id: sessionId } = req.session.user;
    const { date, mealtime, carbo, protein, fat } = req.body;
    const selectedDate = new Date(date);
    const cal = calc_cal(carbo, protein, fat);

    selectedDate.setHours(0, 0, 0, 0);

    const intakeResult = await models.Intake.create(
      {
        mealtime,
        carbo,
        protein,
        fat,
        cal,
        createdAt: selectedDate,
        id: sessionId,
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

//로그아웃 controller
exports.postLogout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) throw err;
      res.send({ isOut: true });
    });
  } catch (err) {
    console.log("Cmain.js postLogout : server error", err);
    res.status(500).send("Cmain.js postLogout : server error");
  }
};

// GET /intake/monthly
exports.getMonthlyIntake = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/");
    }

    const { id: sessionId } = req.session.user;
    const { month } = req.query;

    const now = new Date();
    const [year, selectedMonth] = month
      ? month.split("-")
      : [now.getFullYear(), now.getMonth() + 1];

    const startOfMonth = new Date(year, selectedMonth - 1, 1);
    const endOfMonth = new Date(year, selectedMonth, 0);

    // 월별 섭취 데이터 조회
    const monthIntakeData = await models.Intake.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("createdAt")), "intakeDate"],
        [Sequelize.fn("SUM", Sequelize.col("carbo")), "cumCarbo"],
        [Sequelize.fn("SUM", Sequelize.col("protein")), "cumProtein"],
        [Sequelize.fn("SUM", Sequelize.col("fat")), "cumFat"],
      ],
      where: {
        id: sessionId,
        createdAt: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfMonth,
        },
      },
      group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
    });

    // 결과 반환
    res.json(monthIntakeData.map((data) => data.dataValues));
  } catch (err) {
    console.log("Cuser.js getMonthlyIntake : server error", err);
    res.status(500).send("Cuser.js getMonthlyIntake : server error");
  }
};

// 데이터가 있는 달 가져오기
// GET /validMonths
exports.getValidMonths = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/");
    }

    const { id: sessionId } = req.session.user;

    const validMonths = await models.Intake.findAll({
      attributes: [
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "year"],
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
      ],
      where: {
        id: sessionId,
      },
      group: [
        Sequelize.fn("YEAR", Sequelize.col("createdAt")),
        Sequelize.fn("MONTH", Sequelize.col("createdAt")),
      ],
      order: [
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "DESC"],
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "DESC"],
      ],
    });

    const months = validMonths.map((entry) => ({
      year: entry.dataValues.year,
      month: entry.dataValues.month,
    }));

    res.json(months);
  } catch (err) {
    console.log("Cuser.js getValidMonths : server error", err);
    res.status(500).send("Cuser.js getValidMonths : server error");
  }
};

// 오른쪽 세션 GET /intake/daily
exports.getDailyIntake = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/");
    }
    const { id: sessionId } = req.session.user;
    const { date } = req.params;

    // 쿼리 파라미터가 없을 경우 현재 날짜로 설정
    const now = new Date();
    const [year, selectedMonth, selecetedDay] = date
      ? date.split("-")
      : [now.getFullYear(), now.getMonth() + 1, now.getDay];

    const startOfDate = new Date(year, selectedMonth - 1, selecetedDay);
    startOfDate.setHours(0, 0, 0, 0);
    const endOfDate = new Date(year, selectedMonth - 1, selecetedDay);
    endOfDate.setHours(23, 59, 59, 999);

    const breakfast = await models.Intake.findAll({
      where: {
        id: sessionId,
        mealtime: "breakfast",
        createdAt: {
          [Op.gte]: startOfDate,
          [Op.lte]: endOfDate,
        },
      },
      attributes: ["mealtime", "carbo", "protein", "fat", "cal"],
      order: [["createdAt"], ["updatedAt"]],
    });
    const lunch = await models.Intake.findAll({
      where: {
        id: sessionId,
        mealtime: "lunch",
        createdAt: {
          [Op.gte]: startOfDate,
          [Op.lte]: endOfDate,
        },
      },
      attributes: ["mealtime", "carbo", "protein", "fat", "cal"],
      order: [["createdAt"], ["updatedAt"]],
    });
    const dinner = await models.Intake.findAll({
      where: {
        id: sessionId,
        mealtime: "dinner",
        createdAt: {
          [Op.gte]: startOfDate,
          [Op.lte]: endOfDate,
        },
      },
      attributes: ["mealtime", "carbo", "protein", "fat", "cal"],
      order: [["createdAt"], ["updatedAt"]],
    });
    const btwmeal = await models.Intake.findAll({
      where: {
        id: sessionId,
        mealtime: "btwmeal",
        createdAt: {
          [Op.gte]: startOfDate,
          [Op.lte]: endOfDate,
        },
      },
      attributes: [
        "mealtime",
        "carbo",
        "protein",
        "fat",
        "cal",
        [Sequelize.fn("DATE", Sequelize.col("createdAt")), "goalSettingDate"],
      ],
      order: [["createdAt"], ["updatedAt"]],
    });

    res.json([
      breakfast.map((data) => data.dataValues),
      lunch.map((data) => data.dataValues),
      dinner.map((data) => data.dataValues),
      btwmeal.map((data) => data.dataValues),
    ]);
  } catch (err) {
    console.log("Cuser.js getDailyIntake : server error", err);
    res.status(500).send("Cuser.js getDailyIntake : server error");
  }
};
