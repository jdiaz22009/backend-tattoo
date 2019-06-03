'use strict'

const Users = require('../../model').userSchema;
const orderWork = require('../../model').orderWork;
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
              return resolve({ token: middlewares(user), code: 201, status: 'OK', user });
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



//?action movil

services.openWork = function (sub, data) {
  return new Promise((resolve, reject) => {
    Users.findById(sub)
      .exec(function (error, userFind) {
        if (error) {
          return reject({ code: 500, status: 'Internal server error', error })
        } else {
          if (!userFind) {
            return reject({ code: 404, status: 'Not Found', message: 'User does not exist' })
          } else {
            let currentDate = moment().format()
            let skup_random = Math.floor(Math.random() * (1000 * 10) + 5)
            data.date_create = currentDate;
            data.date_update = currentDate;
            data.skup_order = skup_random;
            data.id_user = userFind._id;
            orderWork.findOne({ id_user: userFind._id })
              .exec(function (error, findWork) {
                if (error) {
                  return reject({ code: 500, status: 'Internal server error', error })
                } else {
                  if (!findWork) {
                    var order_work = new orderWork(data)
                    orderWork.create(order_work, function (error, createOrder) {
                      if (error) {
                        return reject({ code: 500, status: 'Internal server error', error })
                      } else {
                        return resolve({ code: 201, status: 'Successfully created', createOrder })
                      }
                    })
                  } else {
                    orderWork.findByIdAndUpdate(findWork._id, { $push: { orderWork: data.orderWork } }, { new: true })
                      .exec(function (error, updateOrder) {
                        if (error) {
                          return reject({ code: 500, status: 'Internal server error', error })
                        } else {
                          return resolve({ code: 201, status: 'Successfully update', updateOrder })
                        }
                      })
                  }
                }
              })
          }
        }
      })
  })
}

services.getOpenWork = function (sub) {
  return new Promise((resolve, reject) => {
    Users.findById(sub).exec(function (error, findUser) {
      if (error) {
        return reject({ code: 500, status: 'Internal server error', error })
      } else {
        if (!findUser) {
          return reject({ code: 404, status: 'Not found', message: 'User does not exist' })
        } else {
          console.log(findUser._id,'iduser')
          orderWork.findOne({ id_user: findUser._id }).exec(function (error, findOrder) {
            if (error) {
              return reject({ code: 500, status: 'Internal server error', error })
            } else {
              if (!findOrder) {
                return reject({ code: 404, status: 'Not found', message: 'There is no work order' })
              } else {
                return resolve({ code: 200, status: 'OK', findOrder })
              }
            }
          })
        }
      }

    })

  })
}











//? Acciones de super admin
services.isActiveTatto = function (id_tatto) {
  return new Promise((resolve, reject) => {
    Users.findById(id_tatto, function (error, findTatto) {
      if (error) {
        return reject({ code: 500, status: 'Internal server error', error })
      } else {
        if (!findTatto) {
          return reject({ code: 400, status: 'Bad Request', message: 'user does not exist' })
        } else {
          Users.findByIdAndUpdate(findTatto._id, { isactive: true }, { new: true }, function (error, userUpdate) {
            if (error) {
              return reject({ code: 500, status: 'Internal server error', error })
            } else {
              return resolve({ code: 200, status: 'OK', message: 'user updated status activated', userUpdate })
            }
          })
        }
      }
    })

  })
}

module.exports = services;
