// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("./../routes");
const {
  notFoundHandler,
} = require("./../handlers/routeHandlers/notFoundHandler");
// handler Object - Module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // request handling
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/|\/$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;
  const decoder = new StringDecoder("utf-8");

  const chosenRoutes = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  let realData = "";
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    // handle response
    res.end("hello World ! How are you ??");
  });
};

module.exports = handler;
