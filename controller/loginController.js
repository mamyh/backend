//external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
//internal imports
const User = require("../models/people");

//get login page
function myLogin(req, res, next) {
  res.render("index");
}

//login functionality
async function login(req, res, next) {
  try {
    const myUser = await User.findOne({
      $or: [
        { mobile: req.body.username },
        { email: req.body.username },
      ],
    });
    if (myUser && myUser._id) {
      //check password is matched or not
      const isMatched = await bcrypt.compare(
        req.body.password,
        myUser.password
      );
      if (isMatched) {
        //create payload object for jwt token
        const userObject = {
          userName: req.body.username,
          mobile: myUser.mobile,
          email: myUser.email,
          role: "user",
        };
        //create jwt token
        const token = jwt.sign(
          userObject,
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRY,
          }
        );

        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        //set logged in user locals identifier
        res.locals.loggedInUser = userObject;

        //redirect to inbox page
        res.render("inbox");
      } else {
        //password is invalid
        console.log("password not matched");
        throw createError(
          "Login failed ! authentication failed "
        );
      }
    } else {
      throw createError("Login failed ! authentication failed ");
    }
  } catch (err) {
    console.log(err);
    //if error , have to stay in index page or login page
    res.render("index", {
      data: {
        userName: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

//logout process
function logout(req, res, next) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged Out");
}

module.exports = { myLogin, login, logout };
