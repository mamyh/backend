//external imports
const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0
      ? req.signedCookies
      : null;
  if (cookies) {
    try {
      //retrieve the token
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded;
      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }
      next();
    } catch (err) {
      console.log(err);
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication Failure!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(401).json({
        error: "Authentication failure",
      });
    }
  }
}

function redirectToLoggedIn(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0
      ? req.signedCookies
      : null;
  if (!cookies) {
    next();
  } else {
    res.redirect("/inbox");
  }
}
module.exports = { checkAuth, redirectToLoggedIn };
