const { Op, Sequelize } = require("sequelize");
const models = require("../models");

exports.getMypage = async (req, res) => {
  try {
    // 세션 있으면 goal 있냐 없냐에 따라서 isSettingGoal true/false 전달 각각 mypage after/before,
    // my page after : 세팅한 goal 정보 가져와서 보여주기
    // my page before : 빈 값으로 보여주기
    if (!req.session.user) {
      res.redirect("/");
    }
    console.log(req.session.user);
    console.log(req.params);
    const { id: sessionId, name: sessionName } = req.session.user;
    const today = new Date().toISOString().split("T")[0]; // 기본값: 오늘 날짜
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const goal_id = await models.UserGoal.findOne({
      where: { id: sessionId },
    });
    console.log(today, goal_id);
    if (goal_id) {
      // 1. 유저 목표 설정 정보
      const userGoal = await models.UserGoal.findOne({
        where: { id: sessionId },
        attributes: [
          "weight",
          "goalWeight",
          "period",
          "AMR",
          "recomIntake",
          "recomCarbo",
          "recomProtein",
          "recomFat",
          [Sequelize.fn("DATE", Sequelize.col("createdAt")), "goalSettingDate"], // createdAt에서 날짜 부분만 추출 ex)'2024-12-01'
        ],
      });
      console.log("goalSettingDate>>", userGoal.dataValues.goalSettingDate);
      const goalDate = new Date(userGoal.dataValues.goalSettingDate);
      goalDate.setDate(goalDate.getDate() + userGoal.dataValues.period);

      const intakeData = await models.Intake.findAll({
        where: {
          id: sessionId,
          createdAt: {
            [Op.gte]: startOfToday, // 0시 이후
            [Op.lte]: endOfToday, // 23시 59분 이전
          },
        },
      });

      let todayCarbo = 0;
      let todayProtein = 0;
      let todayFat = 0;
      let todayCal = 0;
      for (let i of intakeData) {
        todayCarbo += i.carbo;
        todayProtein += i.protein;
        todayFat += i.fat;
        todayCal += i.cal;
      }

      res.render("user", {
        sessionId,
        isSettingGoal: true,
        username: sessionName,
        userGoal,
        goalDate,
        userTodayIntakes: {
          todayCarbo,
          todayProtein,
          todayFat,
          todayCal,
        },
      });
    } else {
      res.render("user", {
        sessionId,
        isSettingGoal: false,
        username: sessionName,
        userGoal: {},
        goalDate: {},
        userTodayIntakes: {},
      });
    }
  } catch (err) {
    console.log("Cuser.js getMypage : server error", err);
    res.status(500).send("Cuser.js getMypage : server error");
  }
};

exports.getTodayIntake = async (req, res) => {
  try {
    const { id: sessionId } = req.session.user;
    const { date } = req.query;
    const selectedDate = date ? new Date(date) : new Date().toISOString().split("T")[0];
    const startOfToday = new Date(selectedDate);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(selectedDate);
    endOfToday.setHours(23, 59, 59, 999);

    // console.log("세션 ID:", sessionId);
    // console.log("오늘 시작:", startOfToday);
    // console.log("오늘 끝:", endOfToday);

    const meals = await models.Intake.findAll({
      where: {
        id: sessionId,
        createdAt: {
          [Op.gte]: startOfToday,
          [Op.lte]: endOfToday,
        },
      },
      attributes: ["intake_id","mealtime", "carbo", "protein", "fat", "cal"],
    });

    // console.log("DB에서 가져온 데이터:", meals);

    if (!meals || meals.length === 0) {
      return res.json({
        breakfast: [],
        lunch: [],
        dinner: [],
        btwmeal: [],
      });
    }

    const groupedMeals = meals.reduce(
      (acc, meal) => {
        if (!acc[meal.mealtime]) {
          acc[meal.mealtime] = [];
        }
        acc[meal.mealtime].push(meal.dataValues);
        return acc;
      },
      { breakfast: [], lunch: [], dinner: [], btwmeal: [] }
    );

    res.json({
      breakfast: groupedMeals.breakfast,
      lunch: groupedMeals.lunch,
      dinner: groupedMeals.dinner,
      btwmeal: groupedMeals.btwmeal,
    });
  } catch (err) {
    console.error("Error in getTodayIntake:", err.message);
    res.status(500).send("Cuser.js getTodayIntake : server error");
  }
};

exports.deleteIntake = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await models.Intake.destroy({
      where: { intake_id: id },
    });

    if (result) {
      res.status(200).send("삭제 성공");
    } else {
      res.status(404).send("데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("Error in deleteIntake:", err.message);
    res.status(500).send("Cmaypage.js deleteIntake : server error");
  }
};