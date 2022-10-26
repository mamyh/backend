const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // req is a readable stream thats why we can write req.on
    // res is  a writeable stream
    const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
    myReadStream.pipe(res);
});

// server.on('connection', (socket) => {
//     console.log('i am connected');
// });
server.listen(3000);
