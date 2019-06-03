'use strict'
const service = require('./services');
const controller = {}


//? general api
controller.register = function (req, res, next) {
  const { body } = req;
  service.register(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)

    })
}

controller.login = function (req, res, next) {
  const { body } = req
  service.login(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)

    })
}

//? api movil
controller.order_work = function (req, res, next) {
  const { body } = req
  const { sub } = req.user
  service.openWork(sub, body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

controller.getOrderWork = function (req, res, next) {
  const { sub } = req.user
  service.getOpenWork(sub)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)
    })
}








//? api admin
controller.isActive = function (req, res, next) {
  const { sub } = req.user
  service.isActiveTatto(sub)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)

    })
}


module.exports = controller