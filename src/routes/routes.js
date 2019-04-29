const express = require('express');
var api = express.Router();
var request = require('./connect');
var port_routes = require('./port_routes');

//? Routes
api.post('/:any*?',function(req,res){
    var headers = {
        'Authorization':req.headers.authorization
    };
    var data = req.body;
    var portos = req.originalUrl.split("/");
    var path = portos[3];
    console.log(data,'data',portos, 'portos',path,'path')
    request.petition('POST',req.originalUrl,port_routes[path].port,data,headers)
    .then(function(response){
        console.log('res',response)
        res.status(200).send(response);
    })
    .catch(function(error){
        res.status(500).send(error);
    })
})

api.get('/:any*?',function(req,res){
    var headers = {
        'Authorization':req.headers.authorization
    };
    var portos = req.originalUrl.split("/");
    var path = portos[3];
    request.petition('GET',req.originalUrl,port_routes[path].port,{},headers)
    .then(function(response){
        res.status(200).send(response);
    })
    .catch(function(error){
        res.status(500).send(error);
    })
})

api.put('/:any*?',function(req,res){
    var headers = {
        'Authorization':req.headers.authorization
    };
    var portos = req.originalUrl.split("/");
    var path = portos[3];
    request.petition('PUT',req.originalUrl,port_routes[path].port,req.body,headers)
    .then(function(response){
        res.status(200).send(response);
    })
    .catch(function(error){
        res.status(500).send(error);
    })
})

api.delete('/:any*?',function(req,res){
    var headers = {
        'Authorization':req.headers.authorization
    };
    var portos = req.originalUrl.split("/");
    var path = portos[3];
    request.petition('DELETE',req.originalUrl,port_routes[path].port,{},headers)
    .then(function(response){
        res.status(200).send(response);
    })
    .catch(function(error){
        res.status(500).send(error);
    })
})

module.exports = api;