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


const OrderWork = Schema({
  id_user: { type: Schema.Types.ObjectId, ref: 'users' },
  orderWork: [
    {
      skup_order: { type: Number, default: 0 },
      nameClient: { type: String, default: '' },
      lastNameClient: { type: String, default: '' },
      address: { type: String, default: '' },
      age: { type: Number, default: 0 },
      phone: { type: Number, default: 0 },
      url_firma: { type: String, default: '' },
      numberSession: { type: String, default: 0 },
      nameTutor: { type: String, default: '' },
      lastNameTutor: { type: String, default: '' },
      phoneTutor: { type: String, default: '' },
      urlFirmaTutor: { type: String, default: 0 },
    },
  ],
  photoUrlTattoStart: { type: String, default: '' },
  photoUrlTattoFinish: { type: String, default: '' },
})

UserSchema.methods.toJSON = function () {
  const userThis = this;
  const userObject = userThis.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

UserSchema.plugin(uniqueValidator);

var userSchema = mongoose.model('users', UserSchema);
var orderWork = mongoose.model('orderWork', OrderWork);

module.exports.userSchema = userSchema;
module.exports.orderWork = orderWork;


