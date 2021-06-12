const User = require('../../models/user');
const Message = require('../../models/message');

module.exports = {
  info() {
    return {
      mensaje: 'Welcome to iti-chat-graphql-api',
    };
  },
  async me(_, __, { user }) {
    try {
      if (!user) return null;
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
  async users() {
    try {
      const data = await User.find().select(['-messages']);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async getMessages(_, { contactId }, { user }) {
    try {
      if (!user) return null;
      const messages = await Message.find({
        $and: [
          { $or: [{ to: user._id }, { from: user._id }] },
          { $or: [{ to: contactId }, { from: contactId }] },
        ],
      }).sort([['_id', 1]]);
      return messages;
    } catch (error) {
      return null;
    }
  },
};
