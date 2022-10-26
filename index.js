const http = require('http');
const os = require('os');
const fs = require('fs');
const School = require('./school');

fs.writeFileSync('hello.txt', 'Hello Programmers ! this is your time to rock on');
fs.appendFileSync('hello.txt', 'this is appended');
// asynchronous way
fs.readFile('hello.txt', (err, data) => {
    console.log(data.toString());
});
console.log('plateform ', os.platform());
console.log('home directory', os.homedir());
const { people, a } = require('./people');

console.log(exports);

console.log('people', people, a);

const school = new School();

// creating an event handler
// const chitkardibo = () => {
//     console.log('oi beta koi tui ami daraiye asi ');
// };

// // assign the handler into an event
// emitter.on('scream', chitkardibo);

// // firing the event or raise an event
// emitter.emit('scream');

// register a listener for bellRing Event
school.on('bellRing', ({ period, text }) => {
    console.log(`we need to run because ${period} ${text}`);
});

school.startPeriod();
// create an http server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(
        JSON.stringify({
            data: 'i dont know',
        })
    );
});

server.listen(3000);

console.log(__dirname);
console.log(__filename);
