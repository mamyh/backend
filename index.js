const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    // res.send('heeloo synchronous');
    // throw new Error('its a synchronous error');
    // res.send(a);
    for (let i = 0; i <= 10; i++) {
        if (i === 5) {
            next('there was an error!');
        }
        res.write('a');
    }
    res.end();
});
// for synchronous code express handle error itself

// 404 error handler
app.use((req, res, next) => {
    // res.status(404).send('Reqested url was not found');
    // send error to the error handler
    next('Requested page was not  found');
});
// invisible default error handling middleware
// have to be last middleware function afterthat no middleware is applicable
app.use((err, req, res, next) => {
    // handle error here
    // console.log(err);
    if (res.headersSent) {
        next('there was a problem');
    } else {
        if (err.message) {
            res.status(500).send(err.message);
        }
        res.status(500).send('there was an error');
    }
});
app.listen(3000, () => {
    console.log('listening to the port of 3000');
});
