"use strict";

const express = require("express");
const api = express.Router();
const user = require("./users/v1/controller");
const middlewares = require("../../middlewares/token").Authentication;
const middlewaresAdmin = require("../../middlewares/token").AuthenticationAdmin;

//? general ---------------------------------
api.post("/v1/auth/register", user.register);
api.post("/v1/auth/login", user.login);
api.post("/v1/auth/validEmail", user.validEmail);
api.post("/v1/auth/createGuide", user.createGuide);
//? -------------------------------------------

//? action app movil
api.post("/v1/auth/sendForgotPassword/:id", user.forgotPassword);
api.post("/v1/auth/createOrderWork", middlewares, user.order_work);
api.get("/v1/auth/getOrderWork", middlewares, user.getOrderWork);
api.get("/v1/auth/getGuide", middlewares, user.getGuide);
api.post("/v1/auth/updateViewOrder", middlewares, user.updateViewOrder);

//? action admin
api.put("/v1/auth/isActive", middlewaresAdmin, user.isActive);
api.post("/v1/auth/emailTatto", user.emailTatto);
api.post("/v1/auth/emailTattoOrder", user.emailTattoOrder);

module.exports = api;
