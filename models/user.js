const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  contacts: [
    {
      alias: {
        type: String,
      },
      userId: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mensaje',
    },
  ],
});

userModel = model('User', userSchema, 'users');

module.exports = userModel;
