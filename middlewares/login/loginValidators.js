//external imports
const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("username")
    .isLength({
      min: 3,
    })
    .withMessage("Mobile number or email is required"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("Password is required"),
];

const doLoginValidatorsHandlers = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        userName: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidatorsHandlers,
};
