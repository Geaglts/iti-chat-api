const { Schema, model } = require('mongoose');
const { hour, date } = require('../utils/getTimeNow');

const messageSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: true,
  },
  hour: {
    type: String,
    required: true,
    default: '00:00 AM',
  },
  date: {
    type: String,
    required: true,
    default: '00/00/0000',
  },
  state: {
    type: Number,
    required: true,
    default: 1,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

messageSchema.pre('save', function (next) {
  if (this.isNew) {
    this.hour = hour;
    this.date = date;
  }
  next();
});

const messageModel = model('Message', messageSchema, 'messages');

module.exports = messageModel;
