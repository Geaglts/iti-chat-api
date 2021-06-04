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
  async updateContacts(_, { input }) {
    try {
      // Traer a un usuario
      const user = await User.findById(input.userId).select({
        contacts: 1,
      });
      if (!user) return false;
      user.contacts = [];
      for (let contact of input.contacts) {
        const { alias, phone } = contact;
        // ¿El usuario tiene cuenta?
        const userHasAccount = await User.findOne({ phone }).select({
          _id: 1,
        });
        if (userHasAccount) {
          // ¿El usaurio ya esta agregado?
          const userRegister = user.contacts.some((contact) => {
            return String(contact.userId) === String(userHasAccount._id);
          });
          // Si el usuario no esta registrado, agregalo
          if (!userRegister) {
            user.contacts.push({ alias, userId: userHasAccount._id });
            await user.save();
          }
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
