'use strict'

const request = require('request');

exports.petition = function (type, path, port, data, headers) {
    return new Promise(function (resolve, reject) {
        const localhost = process.env.LOCALHOST || 'http://127.0.0.1'
        var options = {
            method: type,
            url: localhost + ':' + port + path,
            form: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': headers.Authorization
            },
            rejectUnauthorized: false
        }


        request(options, function (error, response, body) {
            if (error) {
                console.log(error)
                return reject(error)
            }
            else {
                return resolve(body)
            }
        })
    })
}