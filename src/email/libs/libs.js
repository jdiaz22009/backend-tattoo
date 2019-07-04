"use strict";
const nodemailer = require("nodemailer");
const email = require("email-templates");
const path = require("path");
const libs = {};

libs.email = (data, file) =>
  new Promise((resolve, reject) => {
    console.log(data, "libs");
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "juandavidjdde@gmail.com",
        pass: "shinigamiRyuk"
      }
    });
    transport.verify((err, success) => {
      if (err) {
        console.error(err, "error");
        return reject({ code: 401, status: "Unauthorized", err });
      } else {
        let templateUrl = path.join(__dirname, `../${file}/html`);
        const emails = new email();
        emails
          .render(templateUrl, data)
          .then(response => {
            if (!response) {
              console.log(response, "error");
              return reject(response);
            } else {
              transport
                .sendMail({
                  from: "Tattoya <juandavidjdde@gmail.com>",
                  to: data.email,
                  subject: `Bienvenido ${data.name} a Tattoya`,
                  html: response
                })
                .then(result => {
                  return resolve({
                    code: 200,
                    status: "OK",
                    message: "Message sent succesfully",
                    result
                  });
                })
                .catch(err => {
                  console.error(err);
                  return reject({
                    code: 500,
                    status: "Error internal serve",
                    message: "The mail was not sent correctly",
                    err
                  });
                });
            }
          })
          .catch(err => {
            return reject({
              code: 500,
              message: "Error al cargar el template",
              err
            });
          });
      }
    });
  });

module.exports = libs;
