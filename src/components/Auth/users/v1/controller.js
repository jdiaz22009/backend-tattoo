"use strict";
const service = require("./services");
const email = require("../../../../email/libs/libs");
const controller = {};

//? general api
controller.register = (req, res, next) => {
  const { body } = req;
  service
    .register(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

controller.login = (req, res, next) => {
  const { body } = req;
  service
    .login(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

//? api movil
controller.order_work = (req, res, next) => {
  const { body } = req;
  const { sub } = req.user;
  service
    .openWork(sub, body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

controller.getOrderWork = (req, res, next) => {
  const { sub } = req.user;
  service
    .getOpenWork(sub)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

controller.validEmail = (req, res, next) => {
  const { body } = req;
  console.log(body);
  service
    .validEmailExist(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

//? api admin
controller.isActive = (req, res, next) => {
  const { sub } = req.user;
  service
    .isActiveTatto(sub)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

controller.emailTatto = (req, res, next) => {
  const { body } = req;
  console.log(body)
  let file = 'accountTatto'
  email
    .email(body,file)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

module.exports = controller;
