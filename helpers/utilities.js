// dependencies
const crypto = require("crypto");
const environments = require("./environments");

// Module scaffolding
const utilities = {};

// parse json string to Object
utilities.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

// hash  the string
utilities.hash = (string) => {
  if (typeof string === "string" && string.length > 0) {
    const hash = crypto
      .createHmac("sha256", environments.secreteKey)
      .update(string)
      .digest("hex");
    return hash;
  }
  return false;
};

//create readom string from given words
utilities.createRandomString = (strLen) => {
  const givenWords = "abcdefghijklmnopqrstubwxyz1234567890";
  let singleWord = "";
  let randomString = "";
  const stringLen = typeof strLen === "number" ? strLen : false;
  if (stringLen) {
    for (let i = 0; i < stringLen; i++) {
      singleWord = givenWords.charAt(Math.floor(Math.random() * strLen));
      randomString += singleWord;
    }
  }

  return randomString;
};

module.exports = utilities;
