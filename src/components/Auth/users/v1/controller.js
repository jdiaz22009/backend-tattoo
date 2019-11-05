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
  console.log('body', body)
  service
    .login(body)
    .then(response => {
      console.log(response, 'response')
      res.status(200).send(response);
    })
    .catch(error => {
      console.error('error', error)
      res.status(500).send(error);
    });
};

controller.createGuide = (req, res, next) => {
  const { body } = req
  console.log('body', body)
  service.createGuide(null, body)
    .then(response => {
      console.log(response, 'response')
      res.status(200).send(response);
    })
    .catch(error => {
      console.error('error', error)
      res.status(500).send(error);
    });
}



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

controller.getGuide = (req, res, next) => {
  const { user } = req
  service.getGuide(user['sub'])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
}

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
  console.log(body);
  let file = "accountTatto/html";
  email
    .email(body, file)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

controller.emailTattoOrder = (req, res, next) => {
  const { body } = req;
  console.log(body);
  let file = "confirmOrders/html";
  email
    .email(body, file)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

controller.forgotPassword = (req, res, next) => {
  const { body, params } = req;
  service.sendForgotPassword(body, params['id'])
    .then(resp => {
      console.log(JSON.stringify(resp), 'res')
      res.status(200).send(resp);
    })
    .catch(e => {
      console.error(e)
      res.status(500).send(e);
    })
};
controller.updateViewOrder = (req, res, next) => {
  const { body } = req;
  const { sub } = req.user;
  service.updateViewOrder(sub, body)
    .then(resp => {
      console.log(JSON.stringify(resp), 'res')
      res.status(200).send(resp);
    })
    .catch(e => {
      console.error(e)
      res.status(500).send(e);
    })
};

module.exports = controller;
