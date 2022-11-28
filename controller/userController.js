//external import
const { unlink } = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

//internal import
const User = require("../models/people");

//get users page
async function myUsers(req, res, next) {
  try {
    const users = await User.find();

    res.render("users", {
      users,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

//add user

async function addUser(req, res, next) {
  let newUser;
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );
    console.log(req.body);
    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
    }
    //save the data
    const result = await newUser.save();
    res.status(200).json({
      message: "user successfully added",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured",
        },
      },
    });
  }
}

//remove user from db
async function removeUser(req, res, next) {
  try {
    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedUser.avatar) {
      unlink(
        path.join(
          __dirname,
          `../public/uploads/avatar/${deletedUser.avatar}`
        ),
        (err) => {
          if (err) console.log(err);
        }
      );
      res.status(200).json({
        message: "User was deleted successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "could not delete the user !",
        },
      },
    });
  }
}
module.exports = { myUsers, addUser, removeUser };
