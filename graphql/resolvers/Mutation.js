const User = require('../../models/user');
const Message = require('../../models/message');
const { NUEVO_MENSAJE } = require('../constants');

const getTimeNow = require('../../utils/getTimeNow');

module.exports = {
  async crearUsuario(_, { input }) {
    try {
      const { contacts, ...rest } = input;
      let contactsWithUser = [];
      // Find users
      for ({ alias, phone } of contacts) {
        const userExists = await User.findOne({ phone });
        if (userExists) {
          contactsWithUser.push({ alias, userId: userExists._id });
        }
      }
      const newUser = await User({ ...rest, contacts: contactsWithUser });
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
    }
  },
  async enviarMensaje(_, { input }, { pubsub }) {
    try {
      const time = getTimeNow();
      const mensaje = new Message({ ...input, time });
      await mensaje.save();
      await Message.find().or([{ from: input.de }, { to: input.de }]);
      pubsub.publish(NUEVO_MENSAJE, { nuevoMensaje: mensaje });
      return {
        estado: true,
      };
    } catch (err) {
      return {
        estado: false,
      };
    }
  },
};
