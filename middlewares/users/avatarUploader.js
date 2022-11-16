const uploader = require("../../utilities/singleUploader");

function avatarUploader() {
  const avatar = uploader(
    "avatar",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "jpeg,jpg or png are allowed"
  );

  //call the middleware function
  avatar.any()(req, res, (err) => {
    if (err) {
      //send the error response
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      //call the next middleware
      next();
    }
  });
}
