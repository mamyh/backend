//external import
const bcrypt = require("bcrypt");

//internal import
const User = require("../models/people");
//get users page
function myUsers(req, res, next) {
  res.render("users");
}

//add user

async function addUser(req, res, next) {
  let newUser;
  try {
    const hashedPassword = await bcrypt.has(
      req.body.password,
      10
    );
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
    res.status(500).json({
      errors: {
        commont: {
          msg: "Unknown error occured",
        },
      },
    });
  }
}

module.exports = { myUsers };
