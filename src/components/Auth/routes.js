'use strict'

const express = require('express');
const api = express.Router();
const user = require('./v1/controller');

api.post('/v1/auth/users/register',user.register);

module.exports = api
