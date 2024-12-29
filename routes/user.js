const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

// "/user" 경로로 들어왔을 때,
// router.get("/", controller.getUser);

router.get("/settingGoal", controller.getSetGoal);
router.get("/intake/daily:date?", controller.getDailyIntake);
router.get("/patch", controller.getUserUpdate);
router.get("/intake/monthly", controller.getMonthlyIntake);
router.get("/validMonths", controller.getValidMonths);
router.get("/pwUpdate", controller.getPwUpdate);

router.patch("/patch", controller.patchUser);
router.patch("/patchPw", controller.patchPw);
router.delete("/delete", controller.deleteUser);

router.post("/settingGoal", controller.postSetGoal);
router.post("/dailyIntake", controller.postIntake);
router.post("/logout", controller.postLogout);

module.exports = router;
