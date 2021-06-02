const User = require('../../models/user');
const Message = require('../../models/message');

module.exports = {
  info() {
    return {
      mensaje: 'Welcome to iti-chat-graphql-api',
    };
  },
  async misDatos(_, { id }) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  async usuarios() {
    try {
      const data = await User.find().select(['-messages']);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async verificarCuenta(_, { phone }) {
    try {
      const userExists = await User.findOne({ phone });
      return userExists._id;
    } catch (error) {
      return null;
    }
  },
  async getMessages(_, { userId, contactId }) {
    try {
      const messages = await Message.find({
        $or: [
          {
            to: userId,
            from: contactId,
          },
          {
            to: contactId,
            from: userId,
          },
        ],
      }).sort([['_id', 1]]);
      return messages;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
