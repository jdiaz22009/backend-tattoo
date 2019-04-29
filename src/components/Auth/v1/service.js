'use strict'

const users = require('../model').userSchema;
const services = {};

services.register = function(data){
    return new Promise((resolve,reject)=>{
        console.log(data,'data')
    })
}

module.exports = services;
