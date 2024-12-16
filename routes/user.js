const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

// "/user" 경로로 들어왔을 때,
router.get("/", controller.getUser);
router.get("/settingGoal", controller.getSetGoal);
router.get("/dailyInput", controller.getDailyInput);
router.get("/patch", controller.getUserUpdate);

router.patch("/patch", controller.patchUser);
router.delete("/delete", controller.deleteUser);

module.exports = router;
