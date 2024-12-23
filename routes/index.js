const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/", controller.getIndex);
router.get("/signup", controller.getSignup);
router.get("/login", controller.getLogin);
router.get("/findPw", controller.getFindpw); //비번찾기 페이지

router.post("/doSignup", controller.postSignup);
router.post("/doLogin", controller.postLogin);
router.post("/doFindpw", controller.postFindpw);

module.exports = router;
