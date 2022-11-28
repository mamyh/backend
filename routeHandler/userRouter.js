//external import
const express = require("express");

//internal import
const {
  myUsers,
  addUser,
  removeUser,
} = require("../controller/userController");
const { checkAuth } = require("../middlewares/common/checkAuth");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUploader = require("../middlewares/users/avatarUploader");
const {
  addUserValidators,
  addUserValidatorsHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

//user page
router.get(
  "/",
  decodeHtmlResponse("user page"),
  checkAuth,
  myUsers
);

//user added
router.post(
  "/",
  checkAuth,
  avatarUploader,
  addUserValidators,
  addUserValidatorsHandler,
  addUser
);

//delete user
router.delete("/:id", removeUser);
module.exports = router;
