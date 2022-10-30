//dependencies
const crypto = require("crypto");
const environments = require("../helpers/environments");

//Module scaffolding
const utilities = {};

//parse json string to Object
utilities.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

//hash  the string
utilities.hash = (string) => {
  if (typeof string === "string" && string.length > 0) {
    const hash = crypto
      .createHmac("sha256", environments.secreteKey)
      .update(string)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

module.exports = utilities;
