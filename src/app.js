'use stritc'
const express = require('express');
const bodypaser =  require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));

app.use('/api',routes);

module.exports = app