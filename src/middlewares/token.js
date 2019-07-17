'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const tokenSecret = require('./secret').TOKEN_SECRET;

exports.Authentication = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No estas logueado' });
    } else {
        var token = req.headers.authorization.replace(/[""]+/g, '');
        try {
            var payload = jwt.decode(token, tokenSecret);
            if (payload.exp <= moment().unix()) {
                return res.status(401).send({ message: 'El token ha caducado' })
            }
        } catch (error) {
            return res.status(401).send({ message: 'El token no es valido' })
        }
        req.user = payload;
        next();
    }
}

exports.AuthenticationAdmin = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No estas logueado' });
    } else {
        var token = req.headers.authorization.replace(/[""]+/g, '');
        try {
            var payload = jwt.decode(token, tokenSecret);
            if(payload.rol !== 1){
                return res.status(403).send({message:'no eres un administrador', status: 'Acceso prohibido o insuficientes permisos.'})
            }
            if (payload.exp <= moment().unix()) {
                return res.status(401).send({ message: 'El token ha caducado' })
            }
        } catch (error) {
            return res.status(401).send({ message: 'El token no es valido' })
        }
        req.user = payload;
        next();
    }
}

exports.CreateToken = function(user){
    const payload = {
        sub: user._id,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(1,'years').unix()
    }

    return jwt.encode(payload,tokenSecret);

}