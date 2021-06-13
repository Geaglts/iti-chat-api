const User = require('../../models/user');
const Message = require('../../models/message');
const { NUEVO_MENSAJE } = require('../constants');

const getTimeNow = require('../../utils/getTimeNow');

module.exports = {
  async createUser(_, { input }) {
    try {
      const userCreated = new User(input);
      await userCreated.save();
      return userCreated;
    } catch (err) {
      throw new Error(err);
    }
  },
  async updateUser(_, { input }, { user }) {
    try {
      if (!user) return null;
      const updatedUser = await User.findOneAndUpdate(user.userId, input, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  },
  async sendMessage(_, { input }, { pubsub }) {
    try {
      const time = getTimeNow();
      const mensaje = new Message({ ...input, time });
      await mensaje.save();
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
  async updateContacts(_, { input }, { user }) {
    if (!user) return null;
    try {
      user.contacts = [];
      for (let contact of input.contacts) {
        const { phone } = contact;
        // ¿El usuario tiene cuenta?
        const userHasAccount = await User.findOne({ phone }).select({
          phone: 1,
        });
        if (userHasAccount) {
          // ¿El usaurio ya esta agregado?
          const userRegister = user.contacts.some((contact) => {
            return contact.phone === userHasAccount.phone;
          });
          // Si el usuario no esta registrado, agregalo
          if (!userRegister) {
            user.contacts.push(contact);
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
  async newSession(_, { user, password }) {
    try {
      const userExists = await User.findOne({
        $or: [{ phone: user }, { email: user }],
      }).select(['_id', 'password', 'token']);
      if (userExists) {
        const matchPassword = await userExists.verifyPassword(password);
        if (matchPassword) {
          await userExists.save();
          return {
            userId: userExists._id,
            token: userExists.token,
            status: true,
          };
        }
        return false;
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
