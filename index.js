const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

// app configuration
const app = express();
dotenv.config();
app.use(express.json());

// database connection
mongoose
    .connect('mongodb://localhost/todos')
    .then(() => console.log('database connected successfully'))
    .catch((err) => console.log(err));

// application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    return res.status(500).json({ error: err });
}

// start the server
app.listen(3000, () => {
    console.log('listening to the port 3000');
});
