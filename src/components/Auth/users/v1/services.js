"use strict";

const Users = require("../../model").userSchema;
const orderWork = require("../../model").orderWork;
const guideSchema = require("../../model").guideSchema;
const middlewares = require("../../../../middlewares/token").CreateToken;
const moment = require("moment");
const bcrypt = require("bcrypt");
const services = {};
var currentDate = moment().format();

services.register = data =>
  new Promise((resolve, reject) => {

    data["date_create"] = currentDate;
    data["date_update"] = currentDate;
    const createUser = new Users(data);
    Users.findOne({ email: data["email"] }, function (error, findUser) {
      if (error) {
        console.error('Error 1', error)

        return reject({ code: 500, status: "Internal server error", error });
      } else {
        if (findUser) {
          return resolve({
            code: 400,
            status: "Bad request",
            message: "User already exists",
            findUser
          });
        } else {
          createUser["password"] = bcrypt.hashSync(data["password"], 10);
          Users.create(createUser, function (error, user) {
            if (error) {
              console.error('Error', error)
              return reject({
                code: 500,
                status: "Internal server error",
                error
              });
            } else {
              return resolve({
                token: middlewares(user),
                code: 201,
                status: "Create user",
                user
              });
            }
          });
        }
      }
    });
  });

services.login = data =>
  new Promise((resolve, reject) => {
    Users.findOne({ email: data["email"] }, function (error, findUser) {
      if (error) {
        return reject({ code: 500, status: "Internal server error", error });
      } else {
        let password = bcrypt.compareSync(
          data["password"],
          findUser["password"]
        );
        console.log('null', password)
        if (!password || password === null) {
          return resolve({
            code: 400,
            status: "Bad Request",
            message: "Invalid credential"
          });
        } else {
          return resolve({
            token: middlewares(findUser),
            code: 200,
            status: "OK",
            findUser
          });
        }
      }
    });
  });

//?action movil

services.sendForgotPassword = (data, sub) =>
  new Promise((resolve, reject) => {
    Users.findById(sub).exec((err, userF) => {
      if (err) {
        return reject({ code: 500, status: "Internal server error", err });
      } else {
        if (userF) {
          const password = bcrypt.hashSync(data["password"], 10);
          Users.findByIdAndUpdate(userF["_id"], {
            password
          }).exec((err, updatePass) => {
            if (err) {
              return reject({
                code: 500,
                status: "Internal server error",
                error
              });
            } else {
              return resolve({
                code: 201,
                status: "Successfully update",
                updatePass
              });
            }
          });
          console.log("el password es: ", password);
        } else {
          return resolve({
            code: 404,
            status: "Not Found",
            message: "User does not exist"
          });
        }
      }
    });
  });

services.openWork = (sub, data) =>
  new Promise((resolve, reject) => {
    Users.findById(sub).exec(function (error, userFind) {
      if (error) {
        return reject({ code: 500, status: "Internal server error", error });
      } else {
        if (!userFind) {
          return resolve({
            code: 404,
            status: "Not Found",
            message: "User does not exist"
          });
        } else {
          let currentDate = moment().format();
          let skup_random = Math.floor(Math.random() * (1000 * 100) + 5);
          data["date_create"] = currentDate;
          data["date_update"] = currentDate;
          data["orderWork"]["skup_order"] = skup_random;
          data["orderWork"]["state"] = true;
          data["state"] = true;
          data["id_user"] = userFind._id;
          orderWork
            .findOne({ id_user: userFind["_id"] })
            .exec(function (error, findWork) {
              if (error) {
                return reject({
                  code: 500,
                  status: "Internal server error",
                  error
                });
              } else {
                if (!findWork) {
                  var order_work = new orderWork(data);
                  orderWork.create(order_work, function (error, createOrder) {
                    if (error) {
                      console.error("error error create", error)
                      return reject({
                        code: 500,
                        status: "Internal server error",
                        error
                      });
                    } else {
                      return resolve({
                        code: 201,
                        status: "Successfully created",
                        createOrder
                      });
                    }
                  });
                } else {
                  orderWork
                    .findByIdAndUpdate(
                      findWork["_id"],
                      {
                        $push: { orderWork: data["orderWork"] }
                      },
                      { new: true }
                    )
                    .exec(function (error, updateOrder) {
                      if (error) {
                        console.error("error error", error)
                        return reject({
                          code: 500,
                          status: "Internal server error",
                          error
                        });
                      } else {
                        return resolve({
                          code: 201,
                          status: "Successfully update",
                          createOrder: updateOrder
                        });
                      }
                    });
                }
              }
            });
        }
      }
    });
  });

services.getOpenWork = sub =>
  new Promise((resolve, reject) => {
    Users.findById(sub).exec(function (error, findUser) {
      if (error) {
        return reject({ code: 500, status: "Internal server error", error });
      } else {
        if (!findUser) {
          return resolve({
            code: 404,
            status: "Not found",
            message: "User does not exist"
          });
        } else {
          orderWork
            .findOne({ id_user: findUser["_id"] })
            .populate({ path: 'id_user', model: Users })
            .exec(function (error, findOrder) {
              if (error) {
                return reject({
                  code: 500,
                  status: "Internal server error",
                  error
                });
              } else {
                if (!findOrder) {
                  return resolve({
                    code: 404,
                    status: "Not found",
                    message: "There is no work order"
                  });
                } else {
                  return resolve({ code: 200, status: "OK", findOrder });
                }
              }
            });
        }
      }
    });
  });

services.validEmailExist = data =>
  new Promise((resolve, reject) => {
    Users.findOne({ email: data["email"] }).exec((err, res) => {
      if (err) {
        return reject({ code: 500, status: "Internal server error", err });
      } else {
        if (!res) {
          return resolve({
            code: 404,
            status: "Not found",
            message: "Email not exist"
          });
        } else {
          return resolve({ code: 200, status: "OK", res });
        }
      }
    });
  });

services.updateViewOrder = (sub, data) => new Promise((resolve, reject) => {
  Users.findById(sub).exec((err, user) => {
    if (err) {
      return reject({
        code: 400,
        status: "Bad Request",
        message: "user does not exist"
      });
    } else {
      if (user) {
        orderWork.findOne({ id_user: user['_id'] }).exec((err, findOrder) => {
          if (err) {
            return reject({
              code: 400,
              status: "Bad Request",
              message: "user does not exist"
            });
          } else {
            let update = []
            for (let i = 0; i < findOrder['orderWork'].length; i++) {
              const element = findOrder['orderWork'][i];
              if (element['skup_order'] === data['skup_order']) {
                element['nameClient'] = data['nameClient']
                element['lastNameClient'] = data['lastNameClient']
                element['email'] = data['email']
                element['phone'] = data['phone']
              }
              update.push(element)
            }
            orderWork.findByIdAndUpdate(findOrder['_id'], { orderWork: update }, { new: true })
              .exec((error, upOrder) => {
                if (error) {
                  return reject({
                    code: 400,
                    status: "Bad Request",
                    message: "user does not exist"
                  });
                } else {
                  return resolve({
                    code: 200,
                    status: "OK",
                    message: "Order",
                    upOrder
                  });
                }
              })
          }
        })
      } else {
        return resolve({
          code: 404,
          status: "Not found",
          message: "User does not exist"
        });
      }
    }
  })
})

services.getGuide = (sub) => new Promise((resolve, reject) => {
  Users.findById(sub).exec((err, userFind) => {
    if (err) {
      return reject({
        code: 500,
        status: "Internal server error",
        error
      });
    } else {
      if (userFind) {
        guideSchema.find({ state: 1 }).exec((err, guideFind) => {
          if (err) {
            return reject({
              code: 500,
              status: "Internal server error",
              error
            })
          } else {
            return resolve({
              code: 200,
              status: "OK",
              message: "GUIDE",
              guideFind
            });
          }
        })
      } else {
        return resolve({
          code: 404,
          status: "Not found",
          message: "User does not exist"
        });
      }
    }
  })
})

//? Acciones de super admin
services.isActiveTatto = id_tatto =>
  new Promise((resolve, reject) => {
    Users.findById(id_tatto, function (error, findTatto) {
      if (error) {
        return reject({ code: 500, status: "Internal server error", error });
      } else {
        if (!findTatto) {
          return reject({
            code: 400,
            status: "Bad Request",
            message: "user does not exist"
          });
        } else {
          Users.findByIdAndUpdate(
            findTatto["_id"],
            { isactive: true },
            { new: true },
            function (error, userUpdate) {
              if (error) {
                return reject({
                  code: 500,
                  status: "Internal server error",
                  error
                });
              } else {
                return resolve({
                  code: 200,
                  status: "OK",
                  message: "user updated status activated",
                  userUpdate
                });
              }
            }
          );
        }
      }
    });
  });

services.createGuide = (sub, data) => new Promise((resolve, reject) => {
  // Users.findById(sub).exec((err, userFind) => {
  //   if (err) {
  //     return reject({
  //       code: 500,
  //       status: "Internal server error",
  //       error
  //     });
  //   } else {
  //     if (userFind) {
  data['create_at'] = currentDate
  data['update_at'] = currentDate
  var guide = new guideSchema(data)
  console.log(guide, 'guide')
  guideSchema.create(guide, function (err, guideCreate) {
    if (err) {
      return reject({
        code: 500,
        status: "Internal server error",
        error
      });
    } else {
      return resolve({
        code: 201,
        status: "Successfully created",
        guideCreate
      });
    }
  })
  // } else {
  //   return resolve({
  //     code: 404,
  //     status: "Not found",
  //     message: "User does not exist"
  //   });
  // }
  // }
  // })
})
module.exports = services;
