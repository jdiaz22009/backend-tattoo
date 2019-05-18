'use stritc'
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: { type: String, default: '' },
    last_name: {type:String, default: ''},
    document: {type:Number, default: 0, unique: true},
    email: { type: String, default: '', unique: true },
    password: {type:String, default:''},
    date_create: {type: Number, default:0},
    date_update: {type:Number, default: 0}
});

UserSchema.methods.toJSON = function () {
    const userThis = this;
    const userObject = userThis.toObject();
    delete userObject.contrasena;
    delete userObject.__v;
    return userObject;
};

UserSchema.plugin(uniqueValidator);

var userSchema = mongoose.model('users', UserSchema);

module.exports.userSchema = userSchema;


