//external import
const express = require("express");

//internal import
const { myUsers } = require("../controller/userController");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUploader = require("../middlewares/users/avatarUploader");
const {
  addUserValidators,
  addUserValidatorsHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

//user page
router.get("/", decodeHtmlResponse("user page"), myUsers);

//add a user
router.post(
  "/",
  avatarUploader,
  addUserValidators,
  addUserValidatorsHandler
);

module.exports = router;
