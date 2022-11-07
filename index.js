const express = require('express');
const admin = require('./admin');
const publicRoute = require('./public');

const app = express();

app.use('/admin', admin);
app.use('/', publicRoute);

app.listen(3000, () => {
    console.log('listening to the port of 3000');
});
