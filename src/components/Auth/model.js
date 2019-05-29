'use stritc'
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  document: { type: Number, default: 0, unique: true },
  email: { type: String, default: '', unique: true },
  phone: { type: Number, default: 0 },
  password: { type: String, default: '' },
  rol: { type: Number, default: 0 }, // 1. admin , 2. tatuador
  isactive: { type: Boolean, default: false },
  date_create: { type: String, default: 0 },
  date_update: { type: String, default: 0 }
});





UserSchema.methods.toJSON = function () {
  const userThis = this;
  const userObject = userThis.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

UserSchema.plugin(uniqueValidator);

var userSchema = mongoose.model('users', UserSchema);

module.exports.userSchema = userSchema;


