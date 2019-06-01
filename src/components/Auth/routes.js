'use strict'

const express = require('express');
const api = express.Router();
const user = require('./users/v1/controller');
const middlewares = require('../../middlewares/token').Authentication
const middlewaresAdmin = require('../../middlewares/token').AuthenticationAdmin

api.post('/v1/auth/register',user.register);
api.post('/v1/auth/login',user.login);
api.put('/v1/auth/isActive', middlewares ,user.isActive)

module.exports = api
