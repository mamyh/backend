//external import
const express = require("express");

//internal import
const { myInbox } = require("../controller/inboxController");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decodeHtmlResponse("Inbox page"), myInbox);

module.exports = router;
