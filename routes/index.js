const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/", controller.getIndex);
router.get("/signup", controller.getSignup);
router.get("/login", controller.getLogin);

router.post("/doSignup", controller.postSignup);
router.post("/doLogin", controller.postLogin);
router.post("/logout", controller.postLogout);

module.exports = router;
