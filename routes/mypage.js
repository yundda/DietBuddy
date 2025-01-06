const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmypage");

router.get("/main/:date?", controller.getMypage);
router.get("/todayIntake/:date?", controller.getTodayIntake);
router.delete("/dailyIntake/:id?", controller.deleteIntake);

module.exports = router;
