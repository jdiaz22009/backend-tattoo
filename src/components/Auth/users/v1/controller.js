'use strict'
const service = require('./services');
const controller = {}

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