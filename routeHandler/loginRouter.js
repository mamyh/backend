//external import
const express = require("express");

//internal import
const {
  myLogin,
  login,
  logout,
} = require("../controller/loginController");
const {
  redirectToLoggedIn,
} = require("../middlewares/common/checkAuth");
const decodeHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidatorsHandlers,
} = require("../middlewares/login/loginValidators");
const router = express.Router();

//set page title
const pageTitle = "Login";

router.get(
  "/",
  decodeHtmlResponse(pageTitle),
  redirectToLoggedIn,
  myLogin
);

//login functionality
router.post(
  "/",
  decodeHtmlResponse(pageTitle),
  doLoginValidators,
  doLoginValidatorsHandlers,
  login
);

//logout functionality
router.delete("/", logout);

module.exports = router;
