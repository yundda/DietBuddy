const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

// "/user" 경로로 들어왔을 때,
router.get("/", controller.getUser);
router.get("/settingGoal", controller.getSetGoal);
router.get("/dailyIntake", controller.getDailyIntake);
router.get("/patch", controller.getUserUpdate);

router.patch("/patch", controller.patchUser);
router.delete("/delete", controller.deleteUser);

router.post("/user/settingGoal", controller.postSetGoal);
router.post("/user/dailyIntake", controller.postIntake);

module.exports = router;
