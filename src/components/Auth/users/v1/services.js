'use strict'

const Users = require('../../model').userSchema;
const middlewares = require('../../../../middlewares/token').CreateToken
const moment = require('moment');
const bcrypt = require('bcrypt');
const services = {};

services.register = function (data) {
  return new Promise((resolve, reject) => {
    var currentDate = moment().format()
    data.date_create = currentDate
    data.date_update = currentDate
    const createUser = new Users(data)
    Users.findOne({ email: data.email }, function (error, findUser) {
      if (error) {
        return reject({ code: 500, status: 'Internal server error', error });
      } else {
        if (findUser) {
          return reject({ code: 400, status: 'Bad request', message: 'User already exists', findUser })
        } else {
          createUser.password = bcrypt.hashSync(data.password, 10)
          Users.create(createUser, function (error, user) {
            if (error) {
              return reject({ code: 500, status: 'Internal server error', error });
            } else {
              return resolve({ token: middlewares(user), code: 200, status: 'OK', user });
            }
          })
        }
      }
    })
  })
}

services.login = function (data) {
  return new Promise((resolve, reject) => {
    Users.findOne({ email: data.email }, function (error, findUser) {
      if (error) {
        return reject({ code: 500, status: 'Internal server error', error })
      } else {
        let password = bcrypt.compareSync(data.password, findUser.password)
        if (!password) {
          return reject({ code: 400, status: 'Bad Request', message: 'invalid credential' })
        } else {
          return resolve({ token: middlewares(findUser), code: 200, status: 'OK', findUser });
        }
      }
    })
  })
}
module.exports = services;
