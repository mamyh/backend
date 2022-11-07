const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.get('/about', (req, res) => {
    // console.log(res.header(), res.headersSent);
    // res.render('pages/about', {
    //     name: 'bangladesh',
    // });
    // console.log(res.headersSent);
    // res.send('value') //end the response with some data sent
    // res.end(); // end the response withouth data sent
    // res.json({
    //     name: 'bangladesh',
    // }); end the response with some json format data sent.sets contenttype application/json automatically
    // res.status() // set status code for response.. after this you have to end the response
    // res.end()
    res.sendStatus(500); // set status and end the response
});

app.listen(3000, () => {
    console.log('i am listening to the port 3000');
});
