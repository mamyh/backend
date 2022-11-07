const express = require('express');

const publicRoute = express.Router();

publicRoute.use((req, res, next) => {
    console.log('logginh');
    next();
});

publicRoute
    .route('/extra')
    .all((req, res, next) => {
        console.log('i am loggin in everything');
        next();
    })
    .get((req, res) => {
        res.send('get');
    })
    .post((req, res) => {
        res.send('post');
    })
    .put((req, res) => {
        res.send('put');
    })
    .delete((req, res) => {
        res.send('delete');
    });
// const log = (req, res, next) => {
//     console.log('i am logg in something');
//     next();
// };

// publicRoute.all('*', log);
// publicRoute.param('user', (req, res, next, value) => {
//     req.user = value === '1' ? 'Admin' : 'Anonimous';
//     console.log('i am called once!');
//     next();
// });

publicRoute.get('/about', (req, res) => {
    res.send('this is from public about');
});

/// very very important to understand param behavior [video 21 minits 17]
publicRoute.param((param, option) => (req, res, next, value) => {
    if (value === option) {
        next();
    } else {
        res.sendStatus(403);
    }
});

publicRoute.param('user', '2');
// publicRoute.get('/:user', (req, res, next) => {
//     console.log('i am also matched');
//     next();
// });
publicRoute.get('/:user', (req, res) => {
    res.send(`Hello admin`);
});

module.exports = publicRoute;
