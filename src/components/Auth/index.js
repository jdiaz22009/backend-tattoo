'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const config = require('../../db/db_auth');
const cors = require('cors');
const routes = require('./routes');
const path = require('path')
const log = console.log;

const app = express();

const dbUrl = config.db.db;
const port = config.server.port;

app.use(bodyParse.json({ limit: '100mb' }));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

mongoose.connect(dbUrl,
    { autoIndex: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false })
mongoose.connection.on('connected', function () {
    log('Mongose connection is open', dbUrl)
    app.listen(port, function () {
        log(`[tatto - auth] listen on port http://localhots:${port}`)
        app.use(express.static(path.join(__dirname, '../../../public')))
    });
});

mongoose.connection.on('Disconnected', function () {
    log('Mongoose is disconnected')
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        log('Mongoose connection is disconnected due to application termination');
        process.exit(0)
    });
});

app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use('/api', routes);

module.exports = app;
