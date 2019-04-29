'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const config = require('../../db/db_auth');
const cors = require('cors');
const routes = require('./routes');
const log = console.log;

const app = express();

const dbUrl = config.db.db;
const port = config.server.port;

app.use(bodyParse.json({ limit: '100mb'}));
app.use(bodyParse.urlencoded({ extended: true}));
app.use(bodyParse.json());

mongoose.connect(dbUrl,{ autoIndex: false, useCreateIndex:true,useNewUrlParser:true})
mongoose.connection.on('connected',function(){
    log("Mongose connection is open", dbUrl)
    app.listen(port,function(){
        log(`[tec-db] AUTH listen on port ${port}`)
    });
});

mongoose.connection.on('Disconnected', function(){
    log("Mongoose is disconnected")
});

process.on('SIGINT',function(){
    mongoose.connection.close(function(){
        debug(`Connection ERROR`);
        log("Mongoose connection is disconnected due to application termination");
        process.exit(0)
    });
});

app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use('/api',routes);

module.exports = app;
