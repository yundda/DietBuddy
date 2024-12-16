const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

router.get("/", controller.main);
router.get("/login", controller.getLogin);
router.get("/mypage", controller.getMypage);
router.get("/settingGoal", controller.getSetGoal);
router.get("/signup", controller.getSignup);
router.get("/userUpdate", controller.getUserUpdate);

module.exports = router;
