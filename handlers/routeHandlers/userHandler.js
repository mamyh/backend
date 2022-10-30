//dependencies
const { read, create } = require("../../lib/lib");
const { hash, parseJSON } = require("../../helpers/utilities");

// Module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const { method } = requestProperties;
  const acceptedMethod = ["get", "post", "put", "delete"];
  if (acceptedMethod.indexOf(method) > -1) {
    handler._users[method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 5
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean"
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    //make sure that the user does not already exists
    read("users", phone, (err1) => {
      if (err1) {
        //post the data to the server
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        //store the user to db
        create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              messages: "user has been created successfully",
            });
          } else {
            callback(500, {
              error: "could not create users",
            });
          }
        });
      } else {
        callback(500, {
          error: "data already exists",
        });
      }
    });
  } else {
    callback(400, {
      error: "you have problem with request body",
    });
  }
};
handler._users.get = (requestProperties, callback) => {
  //check the phone number is valid

  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    //loopup the user
    read("users", phone, (err, data) => {
      if (!err && data) {
        const user = { ...parseJSON(data) };
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          error: "Requested user was not found",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user was not found",
    });
  }
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};
module.exports = handler;
