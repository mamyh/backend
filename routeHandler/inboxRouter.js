//external import
const express = require("express");

//internal import
const { myInbox } = require("../controller/inboxController");
const { checkAuth } = require("../middlewares/common/checkAuth");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

router.get(
  "/",
  decodeHtmlResponse("Inbox page"),
  checkAuth,
  myInbox
);

module.exports = router;
