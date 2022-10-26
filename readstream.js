const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head></html>');
        res.write(
            '<body><form method="post" action="/process"><input name="message" /></form></body>'
        );
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            console.log('finished');
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
        });
    } else {
        res.write('not found');
        res.end();
    }
});

// server.on('connection', (socket) => {
//     console.log('i am connected');
// });
server.listen(3000);

// const fs = require('fs');

// const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf-8');

// ourReadStream.on('data', (chunk) => {
//     console.log(chunk);
// });
