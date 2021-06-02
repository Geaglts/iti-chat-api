const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});

module.exports = model('Message', messageSchema, 'messages');
