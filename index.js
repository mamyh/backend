// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environments = require('./helpers/environments');
const lib = require('./lib/lib');
// app object - Module scaffolding
const app = {};

// testing file system
lib.remove('test', 'newFile', (err) => {
    console.log(err);
});
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
