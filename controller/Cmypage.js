const { Op, Sequelize } = require("sequelize");

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
      // const startOfDate = new Date(`${date}T00:00:00+09:00`).toISOString(); // KST 기준 0시
      // const endOfDate = new Date(`${date}T23:59:59+09:00`).toISOString(); // KST 기준 23:59:59

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
        console.log("intakeData >>>", intakeData);
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
          const todayBreakfast = await models.Intake.findAll({
            where: {
              id: sessionId,
              mealtime: "breakfast",
              createdAt: {
                [Op.gte]: startOfDate,
                [Op.lte]: endOfDate,
              },
            },
            order: [["createdAt"]],
          });
          const todayLunch = await models.Intake.findAll({
            where: {
              id: sessionId,
              mealtime: "lunch",
              createdAt: {
                [Op.gte]: startOfDate,
                [Op.lte]: endOfDate,
              },
            },
            order: [["createdAt"]],
          });
          const todayDinner = await models.Intake.findAll({
            where: {
              id: sessionId,
              mealtime: "dinner",
              createdAt: {
                [Op.gte]: startOfDate,
                [Op.lte]: endOfDate,
              },
            },
            order: [["createdAt"]],
          });
          const todayBtwmeal = await models.Intake.findAll({
            where: {
              id: sessionId,
              mealtime: "btwmeal",
              createdAt: {
                [Op.gte]: startOfDate,
                [Op.lte]: endOfDate,
              },
            },
            order: [["createdAt"]],
          });
          console.log(
            "todatIntake >>>",
            todayCarbo,
            todayProtein,
            todayFat,
            todayCal,
            todayBreakfast,
            todayLunch,
            todayDinner,
            todayBtwmeal
          );

          // 5. 섭취 비율(그래프)
          // 날짜별 하루 누적 탄단지 값을 배열로 전달
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 이번 달 1일
          const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          ); // 이번 달의 마지막 날을 계산 (다음 달의 첫 번째 날을 기준으로 전날)
          const monthCumIntake = await models.Intake.findAll({
            attributes: [
              [Sequelize.fn("DATE", Sequelize.col("createdAt")), "intakeDate"], // createdAt에서 날짜 부분만 추출 ex)'2024-12-01'
              [Sequelize.fn("SUM", Sequelize.col("carbo")), "cumCarbo"], // 각 날짜별 탄수
              [Sequelize.fn("SUM", Sequelize.col("protein")), "cumProtein"], // 각 날짜별 단백질
              [Sequelize.fn("SUM", Sequelize.col("fat")), "cumFat"], // 각 날짜별 지방
            ],
            where: {
              createdAt: {
                [Op.gte]: startOfMonth, // 현재달 1일
                [Op.lte]: endOfMonth, // 현재달 마지막날
              },
            },
            group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))], // 날짜별로 그룹화
            order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]], // 날짜별로 정렬
          });

          /*
        monthCumIntake =
          [
            {
              date: '2024-12-01',   // 12월 1일의 날짜
              cumCarbo: 20,   // 12월 1일에 해당하는 섭취 탄수 합산 값
              cumProtein: 20,    // 12월 1일에 해당하는 섭취 단백질 합산 값
              cumFat: 20,      // 12월 1일에 해당하는 섭취 지방 합산 값
            },
            {
              date: 
              cumCarbo:
              cumProtein,
              cumFat
            },
          ]
      */
          // 6. 섭취 정보가 있는 달만 전달
          const intakeMonth = await models.Intake.findAll({
            attributes: [[Sequelize.fn("MONTH", Sequelize.col("createdAt")), "Month"]],
            group: [Sequelize.fn("MONTH", Sequelize.col("createdAt"))],
            order: [[Sequelize.fn("MONTH", Sequelize.col("createdAt")), "ASC"]],
          });
          /*
        intakeMonth = 
        [
          { Month: 1 }, // 1월
          { Month: 2 }, // 2월
          { Month: 3 }, // 3월
        ]
      */
          // userTodayIntakes 중 todayBreakfast,todayLunch,todayDinner,todayBtwmeal,monthCumIntake, intakeMonth 는 배열로 전달
          res.render("user", {
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
            monthCumIntake,
            intakeMonth,
          });
        } else {
          res.render("user", {
            isSettingGoal: true,
            isIntakeData: false,
            username: sessionName,
            goalDate: goalDate,
          });
        }
      } else {
        res.render("user", {
          isSettingGoal: false,
          isIntakeData: false,
          username: sessionName,
        });
      }
    } else {
      // 세션 없으면 get 요청으로 /mypage 못 오게 막기
      res.redirect("/");
    }
  } catch (err) {
    console.log("Cuser.js getUser : server error", err);
    res.status(500).send("Cuser.js getUser : server error");
  }
};
