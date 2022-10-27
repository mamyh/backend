// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

// routes Object- module scaffolding
const routes = {
    sample: sampleHandler,
};

module.exports = routes;
