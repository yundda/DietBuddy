const { Op, Sequelize } = require("sequelize");
const models = require("../models");

exports.getMypage = async (req, res) => {
  try {
    // 세션 있으면 goal 있냐 없냐에 따라서 isSettingGoal true/false 전달 각각 mypage after/before,
    // my page after : 세팅한 goal 정보 가져와서 보여주기
    // my page before : 빈 값으로 보여주기
    if (req.session.user) {
      console.log(req.session.user);
      console.log(req.params);
      const { id: sessionId, name: sessionName } = req.session.user;
      const date = req.params.date || new Date().toISOString().split("T")[0]; // 기본값: 오늘 날짜
      const startOfDate = new Date(date);
      startOfDate.setHours(0, 0, 0, 0);
      const endOfDate = new Date(date);
      endOfDate.setHours(23, 59, 59, 999);

      const goal_id = await models.UserGoal.findOne({
        where: { id: sessionId },
      });
      console.log(date, goal_id);
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
              [Op.gte]: startOfDate, // 0시 이후
              [Op.lte]: endOfDate, // 23시 59분 이전
            },
          },
        });
        if (intakeData) {
          // 2. 하루 누적 탄단지 섭취량 ( / 왼쪽 값)
          /*
              [
                RowDataPacket { id: 1, carbo: , protein: , fat : mealtime : },
                RowDataPacket {  },
              ]
            */
          let todayCarbo = 0;
          let todayProtein = 0;
          let todayFat = 0;
          for (let i of intakeData) {
            todayCarbo += i.carbo;
            todayProtein += i.protein;
            todayFat += i.fat;
          }

          // 3. 섭취 칼로리
          const todayCal = todayCarbo * 4 + todayProtein * 4 + todayFat * 9;
          // 4. 아침, 점심, 저녁 별 섭취 정보(오른쪽 페이지) ; 배열로 전달
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
            attributes: ["mealtime", "carbo", "protein", "fat", "cal"],
            order: [["createdAt"], ["updatedAt"]],
          });
          console.log("todayIntake >>>", todayCarbo, todayProtein, todayFat, todayCal);
          const todayBreakfast = [];
          for (let i of breakfast) {
            todayBreakfast.push(i.dataValues);
          }
          const todayLunch = [];
          for (let i of lunch) {
            todayLunch.push(i.dataValues);
          }
          const todayDinner = [];
          for (let i of dinner) {
            todayDinner.push(i.dataValues);
          }
          const todayBtwmeal = [];
          for (let i of btwmeal) {
            todayBtwmeal.push(i.dataValues);
          }

          console.log("todayBreakfast >>>", todayBreakfast);
          console.log("todayLunch >>>", todayLunch);
          console.log("todayDinner >>>", todayDinner);
          console.log("todayBtwmeal >>>", todayBtwmeal);
          // userTodayIntakes 중 todayBreakfast,todayLunch,todayDinner,todayBtwmeal 배열로 전달
          res.render("user", {
            sessionId,
            isSettingGoal: true,
            isIntakeData: true,
            username: sessionName,
            userGoal,
            goalDate,
            userTodayIntakes: {
              todayCarbo,
              todayProtein,
              todayFat,
              todayBreakfast,
              todayLunch,
              todayDinner,
              todayBtwmeal,
              todayCal,
            },
          });
        } else {
          res.render("user", {
            sessionId: sessionId || {},
            isSettingGoal: true,
            isIntakeData: false,
            username: sessionName,
            userGoal,
            goalDate,
            userTodayIntakes: {},
          });
        }
      } else {
        res.render("user", {
          sessionId: sessionId || {},
          isSettingGoal: false,
          isIntakeData: false,
          username: sessionName,
          userGoal: {},
          goalDate: {},
          userTodayIntakes: {},
        });
      }
    } else {
      // 세션 없으면 get 요청으로 /user 못 오게 막기
      res.redirect("/");
    }
  } catch (err) {
    console.log("Cuser.js getUser : server error", err);
    res.status(500).send("Cuser.js getUser : server error");
  }
};

exports.getTodayIntake = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/");
    }
    const { id: sessionId, name: sessionName } = req.session.user;
    const date = req.params.date || new Date().toISOString().split("T")[0]; // 기본값: 오늘 날짜
    const startOfDate = new Date(date);
    startOfDate.setHours(0, 0, 0, 0);
    const endOfDate = new Date(date);
    endOfDate.setHours(23, 59, 59, 999);
    const intakeData = await models.Intake.findAll({
      where: {
        id: sessionId,
        createdAt: {
          [Op.gte]: startOfDate, // 0시 이후
          [Op.lte]: endOfDate, // 23시 59분 이전
        },
      },
    });
    if (!intakeData) {
      return res.redirect("/");
    }
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
      attributes: ["mealtime", "carbo", "protein", "fat", "cal"],
      order: [["createdAt"], ["updatedAt"]],
    });
    res.json([
      breakfast.map((data) => data.dataValues),
      lunch.map((data) => data.dataValues),
      dinner.map((data) => data.dataValues),
      btwmeal.map((data) => data.dataValues),
    ]);
  } catch (err) {
    console.log("Cuser.js getUser : server error", err);
    res.status(500).send("Cuser.js getUser : server error");
  }
};
