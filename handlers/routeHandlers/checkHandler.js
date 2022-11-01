// dependencies
const { read, create, update, remove } = require("../../lib/lib");
const { parseJSON, createRandomString } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
const environmentToExport = require("../../helpers/environments");

// Module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const { method } = requestProperties;
  const acceptedMethod = ["get", "post", "put", "delete"];
  if (acceptedMethod.indexOf(method) > -1) {
    handler._checks[method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._checks = {};

handler._checks.post = (requestProperties, callback) => {
  const protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  const url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  const method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  const successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  const timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;
  if (protocol && url && method && successCodes && timeoutSeconds) {
    // verifying token
    const token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;
    if (token) {
      read("tokens", token, (err1, tdata) => {
        if (!err1 && tdata) {
          const tokenData = { ...parseJSON(tdata) };
          const userPhone = tokenData.phone;
          tokenHandler._token.verify(token, userPhone, (isVerified) => {
            if (isVerified) {
              const checkId = createRandomString(20);
              const checkObject = {
                id: checkId,
                protocol,
                url,
                method,
                successCodes,
                timeoutSeconds,
                userPhone,
              };
              // create checks file
              create("checks", checkId, checkObject, (err2) => {
                if (!err2) {
                  // enter check id to the user file
                  read("users", userPhone, (err3, udata) => {
                    if (!err3 && udata) {
                      const userObject = { ...parseJSON(udata) };
                      const userChecks =
                        typeof userObject.checks === "object" &&
                        userObject.checks instanceof Array
                          ? userObject.checks
                          : [];
                      if (userChecks.length < environmentToExport.maxCheck) {
                        userChecks.push(checkId);
                        userObject.checks = userChecks;
                        // update the user file
                        update("users", userPhone, userObject, (err4) => {
                          if (!err4) {
                            callback(200, checkObject);
                          } else {
                            callback(500, {
                              error: "server can not update user file",
                            });
                          }
                        });
                      } else {
                        callback(402, {
                          error: "maximum limits exceed",
                        });
                      }
                    } else {
                      callback(500, {
                        error: "server can not read the user data",
                      });
                    }
                  });
                } else {
                  callback(500, {
                    error: "server can not create your checks file",
                  });
                }
              });
            } else {
              callback(403, {
                error: "authenticaion failed, may be token expired",
              });
            }
          });
        } else {
          callback(500, {
            error: "server can not read your token",
          });
        }
      });
    } else {
      callback(400, {
        error: "token is not available",
      });
    }
  } else {
    callback(400, {
      error: "you have problem with request body",
    });
  }
};
handler._checks.get = (requestProperties, callback) => {
  // check the phone number is valid

  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    const token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;
    if (token) {
      // read the token data
      read("tokens", token, (err1, tdata) => {
        if (!err1 && tdata) {
          const tokenData = { ...parseJSON(tdata) };
          const userPhone = tokenData.phone;
          tokenHandler._token.verify(token, userPhone, (isVerified) => {
            if (isVerified) {
              // loopup the user
              read("checks", id, (err, data) => {
                if (!err && data) {
                  const checkData = { ...parseJSON(data) };

                  callback(200, checkData);
                } else {
                  callback(404, {
                    error: "Requested checks was not found",
                  });
                }
              });
            } else {
              callback(403, {
                error: "Authentications failed",
              });
            }
          });
        } else {
          callback(500, {
            error: "server can not read token file",
          });
        }
      });
    } else {
      callback(400, {
        error: " you forget to provide token",
      });
    }
  } else {
    callback(404, {
      error: "Requested checks file was not found",
    });
  }
};
handler._checks.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;
  const protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  const url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  const method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  const successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  const timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds >= 5
      ? requestProperties.body.timeoutSeconds
      : false;
  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      const token =
        typeof requestProperties.headersObject.token === "string"
          ? requestProperties.headersObject.token
          : false;
      if (token) {
        read("tokens", token, (err1, tdata) => {
          if (!err1 && tdata) {
            const tokenData = { ...parseJSON(tdata) };
            const userPhone = tokenData.phone;
            tokenHandler._token.verify(token, userPhone, (isVerified) => {
              if (isVerified) {
                // update is here
                read("checks", id, (err2, cdata) => {
                  if (!err2 && cdata) {
                    const checksObject = { ...parseJSON(cdata) };
                    if (protocol) {
                      checksObject.protocol = protocol;
                    }
                    if (url) {
                      checksObject.url = url;
                    }
                    if (method) {
                      checksObject.method = method;
                    }
                    if (successCodes) {
                      checksObject.successCodes = successCodes;
                    }
                    if (timeoutSeconds) {
                      checksObject.timeoutSeconds = timeoutSeconds;
                    }
                    // update the checks file
                    update("checks", id, checksObject, (err3) => {
                      if (!err3) {
                        callback(200, {
                          message: "checks file has been updated successfully",
                        });
                      } else {
                        callback(500, {
                          error: "server can not update checks file",
                        });
                      }
                    });
                  } else {
                    callback(500, {
                      error: "server can not read check data ",
                    });
                  }
                });
              } else {
                callback(401, {
                  error:
                    "authentication failed ! may be your token has been expired",
                });
              }
            });
          } else {
            callback(500, {
              error: "server can not read token data",
            });
          }
        });
      } else {
        callback(400, {
          error: "token is not provided",
        });
      }
    } else {
      callback(400, {
        error: "you have to provide alleast on field to edit",
      });
    }
  } else {
    callback(400, {
      error: "you have problem with your request. please put your check id",
    });
  }
};
handler._checks.delete = (requestProperties, callback) => {
  // check your phone number
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    const token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;
    if (token) {
      read("tokens", token, (err1, tdata) => {
        if (!err1 && tdata) {
          const tokenData = { ...parseJSON(tdata) };
          const userPhone = tokenData.phone;
          tokenHandler._token.verify(token, userPhone, (isVerified) => {
            if (isVerified) {
              // read the data
              read("checks", id, (err2, cdata) => {
                const checkData = { ...parseJSON(cdata) };
                if (!err2 && checkData) {
                  remove("checks", id, (err3) => {
                    if (!err3) {
                      //read the user file according to the user phone
                      read("users", userPhone, (err4, udata) => {
                        if (!err4 && udata) {
                          const userObject = { ...parseJSON(udata) };
                          const checkIdToDelete = userObject.checks.indexOf(id);
                          if (checkIdToDelete > -1) {
                            userObject.checks.splice(checkIdToDelete, 1);
                            //update the user file
                            update("users", userPhone, userObject, (err5) => {
                              if (!err5) {
                                callback(200, {
                                  message: `${id}  checks has been deleted successfully`,
                                });
                              } else {
                                callback(500, {
                                  error: "server can not update user file",
                                });
                              }
                            });
                          }
                        } else {
                          callback(500, {
                            error: "server can not read user file",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "you server has problem to remove  file",
                      });
                    }
                  });
                } else {
                  callback(500, {
                    error:
                      "you have your server problem.no data found to delete",
                  });
                }
              });
            } else {
              callback(403, {
                error: "Authentications failed",
              });
            }
          });
        }
      });
    } else {
      callback(400, {
        error: "token is not provided",
      });
    }
  } else {
    callback(400, {
      error: "search with the check id number you want to delete",
    });
  }
};
module.exports = handler;
