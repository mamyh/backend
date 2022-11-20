//external import
const {
  check,
  validationResult,
  body,
} = require("express-validator");
const { unlink } = require("fs/promises");
const createError = require("http-errors");
const path = require("path");

//internal import
const User = require("../../models/people");

addUserValidators = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name atleast have 3 characters")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name can not containe other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .trim()
    .custom(async (value) => {
      try {
        const isExist = await User.findOne({ email: value });
        if (isExist) {
          throw createError("Email already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage(
      "Mobile number must be a valid Bangladeshi mobile number"
    )
    .custom(async (value) => {
      try {
        const isExist = await User.findOne({ mobile: value });
        if (isExist) {
          throw createError("Mobile already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "password must be at least 8 characters long and should contain 1 lowercase ,1 uppercase , 1 number & 1 symbol"
    ),
];

const addUserValidatorsHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  console.log(mappedErrors);
  /* mappedErrors = {
    name: {
      msg: "name is required",
    },
    email: {
      msg: "email is required",
    },
  }; */
  console.log(mappedErrors);
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    //delete uploaded file

    //find the file to remove
    if (req.files.length > 0) {
      //file is found
      const { filename } = req.files[0];
      unlink(
        path.join(
          __dirname,
          `/../../public/uploads/avatar/${filename}`
        ),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    //response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { addUserValidators, addUserValidatorsHandler };
