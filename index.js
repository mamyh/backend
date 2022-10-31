// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environments = require('./helpers/environments');
// app object - Module scaffolding
const app = {};

// creating  server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(environments.port, () => {
        console.log(`Listening to the port ${environments.port}`);
    });
};

// handling Request and Response
app.handleReqRes = handleReqRes;

// start server
app.createServer();
