const express = require('express');

const app = express();

// admin.get('/', (req, res) => {
//     console.log(app.mountpath);
//     res.send('welcome to admin dashboard');
// });

// app.get('/', (req, res) => {
//     console.log(admin.mountpath);
//     res.send('heelo app');
// });

// app.use('/admin', admin);
app.param('id', (req, res, next, id) => {
    const user = {
        userId: id,
        name: 'Bangladesh',
    };
    req.userDetails = user;
    next();
});

app.get('/user/:id', (req, res) => {
    console.log(req.userDetails);
    res.send('welcome to the world');
});

app.set('view engine', 'ejs');
app.route('/about')
    .get((req, res) => {
        res.render('pages/about');
    })
    .post((req, res) => {
        res.send('i am from post ');
    })
    .put((req, res) => {
        res.send('i am from put');
    });

app.listen(3000, () => {
    console.log('i am listening to the 3000 port');
});
