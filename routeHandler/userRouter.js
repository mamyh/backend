//external import
const express = require("express");

//internal import
const {
  myUsers,
  addUser,
} = require("../controller/userController");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUploader = require("../middlewares/users/avatarUploader");
const {
  addUserValidators,
  addUserValidatorsHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

//user page
router.get("/", decodeHtmlResponse("user page"), myUsers);

//user added
router.post("/", avatarUploader);
module.exports = router;
