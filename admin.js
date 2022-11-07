const express = require('express');

const adminRoute = express.Router();

adminRoute.get('/', (req, res) => {
    res.send('i am from admin route');
});

adminRoute.get('/dashboard', (req, res) => {
    res.send('i am from admin dashboard');
});

module.exports = adminRoute;
