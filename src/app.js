'use stritc'
const express = require('express');
const bodypaser =  require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use(morgan('dev'));

app.use('/api',routes);

module.exports = app