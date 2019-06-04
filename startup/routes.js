const error = require('../middleware/error');
const express = require('express');
const morgan = require('morgan');
const states = require('../routes/states');
const lgas = require('../routes/lgas');


module.exports = function (app) {
    app.use(morgan('tiny'));
    app.use(express.json());
    app.use('/api/states', states);
    app.use('/api/lgas', lgas);
    app.use(error);
}