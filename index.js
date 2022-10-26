// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// app object - Module scaffolding
const app = {};

// configuration
app.config = {
  port: 3000,
};

// creating  server

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(app.config.port, () => {
    console.log(`Listening to the port ${app.config.port}`);
  });
};

// handling Request and Response
app.handleReqRes = handleReqRes;

// start server
app.createServer();
