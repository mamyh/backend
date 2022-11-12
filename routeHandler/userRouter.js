//external import
const express = require("express");

//internal import
const { myUsers } = require("../controller/userController");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const router = express.Router();

router.get("/", decodeHtmlResponse("user page"), myUsers);

module.exports = router;
