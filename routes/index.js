const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
const controller_mypage = require("../controller/Cmypage");

router.get("/", controller.getIndex);
router.get("/customerservice", controller.getService);
router.get("/usercustomerservice", controller.getUserService);
router.get("/signup", controller.getSignup);
router.get("/login", controller.getLogin);

router.get("/findPw", controller.getFindpw);
router.get("/mypage/:date?", controller_mypage.getMypage);
router.get("/todayIntake/:date?", controller_mypage.getTodayIntake);
router.delete("/dailyIntake/:id?", controller_mypage.deleteIntake);

router.post("/doSignup", controller.postSignup);
router.post("/doLogin", controller.postLogin);
router.post("/doFindpw", controller.postFindpw);

module.exports = router;
