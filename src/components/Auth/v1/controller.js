'use strict'
const service = require('./service');
const controller = {}

controller.register = function(req, res, next){
    const {body} = req;
    service.register(body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error)

    })
}

module.exports = controller