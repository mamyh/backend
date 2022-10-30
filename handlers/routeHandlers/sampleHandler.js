// Module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, {
    message: "you are in sample routes",
  });
};

module.exports = handler;
