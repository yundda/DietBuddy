const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/", controller.getIndex);
router.get("/signup", controller.getSignup);
router.get("/login", controller.getLogin);

router.post("/signup", controller.postSignup);
router.post("/login", controller.postLogin);
router.post("/logout", controller.postLogout);

module.exports = router;
