const {
  parseJSON,
  hash,
  createRandomString,
} = require("../../helpers/utilities");
const { read, create, update, remove } = require("../../lib/lib");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethod = ["get", "post", "put", "delete"];
  if (acceptedMethod.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(400, {
      error: "your method is not correct",
    });
  }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
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

  if (phone && password) {
    // read the user data to match
    read("users", phone, (err1, udata) => {
      const userData = { ...parseJSON(udata) };
      if (!err1 && userData) {
        const hashedPassword = hash(password);
        if (phone === userData.phone && userData.password === hashedPassword) {
          const tokenId = createRandomString(20);
          const expires = Date.now() + 60 * 60 * 1000;
          const tokenObject = {
            phone,
            id: tokenId,
            expires,
          };
          // create token file with token
          create("tokens", tokenId, tokenObject, (err2) => {
            if (!err2) {
              callback(200, {
                message: "token has been created successfully",
              });
            } else {
              callback(500, {
                error: "server error. can not create token",
              });
            }
          });
        } else {
          callback(401, {
            error: "your request credintial does not match ! ",
          });
        }
      } else {
        callback(500, {
          error: "server error. cannot read user file",
        });
      }
    });
  } else {
    callback(400, {
      error: "you request must have phone and password!",
    });
  }
};
handler._token.get = (requestProperties, callback) => {
  // check id is valid

  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    // loopup the user
    read("tokens", id, (err, tdata) => {
      if (!err && tdata) {
        const token = { ...parseJSON(tdata) };

        callback(200, token);
      } else {
        callback(404, {
          error: "Requested token was not found",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested token was not found",
    });
  }
};

handler._token.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;
  const extend = !!(
    typeof requestProperties.body.extend === "boolean" &&
    requestProperties.body.extend
  );

  if (id && extend) {
    // read the existance token
    read("tokens", id, (err1, tdata) => {
      if (!err1 && tdata) {
        const tokenObject = { ...parseJSON(tdata) };
        if (tokenObject.expires > Date.now()) {
          tokenObject.expires = Date.now() + 60 * 60 * 1000;
          update("tokens", id, tokenObject, (err2) => {
            if (!err2) {
              callback(200, {
                message: "your token expires has been updated",
              });
            } else {
              callback(500, {
                error: "your server can not update your token exipiries date",
              });
            }
          });
        } else {
          callback(401, {
            error: "your token has been expired",
          });
        }
      } else {
        callback(500, {
          error: "your server can not read token data",
        });
      }
    });
  } else {
    callback(400, {
      error: "your request is not valid .provide tokenid and extend",
    });
  }
};
handler._token.delete = (requestProperties, callback) => {
  // check id is valid

  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    // loopup the user
    remove("tokens", id, (err) => {
      if (!err) {
        callback(200, {
          message: "your token has been deleted ",
        });
      } else {
        callback(404, {
          error: "Requested token was not found",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested token was not found",
    });
  }
};

handler._token.verify = (id, phone, callback) => {
  read("tokens", id, (err, tdata) => {
    if (!err && tdata) {
      const tokenData = { ...parseJSON(tdata) };
      if (tokenData.phone === phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};
module.exports = handler;
