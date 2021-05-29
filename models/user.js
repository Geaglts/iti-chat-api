const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mensaje',
    },
  ],
});

userModel = model('User', userSchema, 'users');

module.exports = userModel;
