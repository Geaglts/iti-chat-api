const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

const generateErrorMessage = require('../utils/generateErrorMessage');

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, generateErrorMessage('nombre')],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, generateErrorMessage('correo')],
      required: [true, generateErrorMessage('correo', 'required')],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          const re = /\S+@\S+\.\S+/i;
          return re.test(v);
        },
        message: 'Este correo no es valido',
      },
    },
    phone: {
      type: String,
      unique: [true, generateErrorMessage('teléfono')],
      required: [true, generateErrorMessage('teléfono', 'required')],
      trim: true,
      validate: {
        validator: function (v) {
          const re = /[0-9]{10}/i;
          return re.test(v);
        },
        message: 'Este teléfono no es valido',
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
    },
    contacts: [
      {
        alias: {
          type: String,
          unique: [true, generateErrorMessage('contacto')],
          required: [true, generateErrorMessage('contacto', 'required')],
        },
        status: {
          type: String,
          default: 0,
        },
        phone: {
          type: String,
        },
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    if (this.name === undefined) {
      this.name = this.email.split('@')[0];
    }
    this.token = jwt.sign({ userId: this._id }, config.publicJwtSecret);
    if (this.contacts.length > 0) {
      let contactsWithUser = [];
      // Find users
      for (contact of this.contacts) {
        const userExists = await userModel.findOne({
          phone: contact.phone,
        });
        if (userExists) {
          if (contactsWithUser.length > 0) {
            const contactIndex = contactsWithUser.findIndex(
              (i) => i.phone === contact.phone
            );
            if (contactIndex === -1) {
              contactsWithUser.push(contact);
            }
          } else {
            contactsWithUser.push(contact);
          }
        }
        userExists.contacts.push({
          alias: this.name,
          phone: this.phone,
        });
        await userExists.save();
      }
      this.contacts = contactsWithUser;
    }
  }
  next();
});

const userModel = model('User', userSchema, 'users');

module.exports = userModel;
