'use strict'

const express = require('express');
const api = express.Router();
const user = require('./users/v1/controller');

api.post('/v1/auth/register/loco',user.register);

module.exports = api
