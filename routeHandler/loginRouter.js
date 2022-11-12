//external import
const express = require("express");

//internal import
const { myLogin } = require("../controller/loginController");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const router = express.Router();

router.get("/", decodeHtmlResponse("login page"), myLogin);

module.exports = router;
