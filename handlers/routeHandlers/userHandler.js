// dependencies
const { read, create, update, remove } = require('../../lib/lib');
const { hash, parseJSON } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');

// Module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const { method } = requestProperties;
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(method) > -1) {
        handler._users[method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 5
            ? requestProperties.body.password
            : false;

    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'boolean'
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user does not already exists
        read('users', phone, (err1) => {
            if (err1) {
                // post the data to the server
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            messages: 'user has been created successfully',
                        });
                    } else {
                        callback(500, {
                            error: 'could not create users',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'data already exists',
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have problem with request body',
        });
    }
};
handler._users.get = (requestProperties, callback) => {
    // check the phone number is valid

    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;

    if (phone) {
        const token =
            typeof requestProperties.headersObject.token === 'string'
                ? requestProperties.headersObject.token
                : false;
        if (token) {
            tokenHandler._token.verify(token, phone, (isVerified) => {
                if (isVerified) {
                    // loopup the user
                    read('users', phone, (err, data) => {
                        if (!err && data) {
                            const user = { ...parseJSON(data) };
                            delete user.password;
                            callback(200, user);
                        } else {
                            callback(404, {
                                error: 'Requested user was not found',
                            });
                        }
                    });
                } else {
                    callback(403, {
                        error: 'Authentications failed',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'Token is invalid',
            });
        }
    } else {
        callback(404, {
            error: 'Requested user was not found',
        });
    }
};
handler._users.put = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 5
            ? requestProperties.body.password
            : false;
    if (phone) {
        if (firstName || lastName || password) {
            const token =
                typeof requestProperties.headersObject.token === 'string'
                    ? requestProperties.headersObject.token
                    : false;
            if (token) {
                tokenHandler._token.verify(token, phone, (isVerified) => {
                    if (isVerified) {
                        // loopup the user
                        // Read your data
                        read('users', phone, (err1, uData) => {
                            const userData = { ...parseJSON(uData) };
                            if (!err1 && userData) {
                                if (firstName) {
                                    userData.firstName = firstName;
                                }
                                if (lastName) {
                                    userData.lastName = lastName;
                                }
                                if (password) {
                                    userData.password = hash(password);
                                }
                                // update file with your updated data
                                update('users', phone, userData, (err2) => {
                                    if (!err2) {
                                        callback(200, {
                                            message: 'your file updated successfully',
                                        });
                                    } else {
                                        callback(500, {
                                            error: 'your server can not update your valid data',
                                        });
                                    }
                                });
                            } else {
                                callback(500, {
                                    error: 'your server doesnot response in reading your data ',
                                });
                            }
                        });
                    } else {
                        callback(403, {
                            error: 'Authentications failed',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'token is invalid',
                });
            }
        } else {
            callback(400, {
                error: 'you have problem with your request',
            });
        }
    } else {
        callback(400, {
            error: 'you have problem with your request. please put your phone number ',
        });
    }
};
handler._users.delete = (requestProperties, callback) => {
    // check your phone number
    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;

    if (phone) {
        const token =
            typeof requestProperties.headersObject.token === 'string'
                ? requestProperties.headersObject.token
                : false;
        if (token) {
            tokenHandler._token.verify(token, phone, (isVerified) => {
                if (isVerified) {
                    // read the data
                    read('users', phone, (err1, udata) => {
                        const userData = { ...parseJSON(udata) };
                        if (!err1 && userData) {
                            remove('users', phone, (err2) => {
                                if (!err2) {
                                    callback(200, {
                                        message: 'you file has been deleted successfully',
                                    });
                                } else {
                                    callback(500, {
                                        error: 'you server has problem to remove  file',
                                    });
                                }
                            });
                        } else {
                            callback(500, {
                                error: 'you have your server problem',
                            });
                        }
                    });
                } else {
                    callback(403, {
                        error: 'Authentications failed',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'token is invalid',
            });
        }
    } else {
        callback(400, {
            error: 'search with the phone number you want to delete',
        });
    }
};
module.exports = handler;
