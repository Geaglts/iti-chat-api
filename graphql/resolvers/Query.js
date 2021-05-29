const User = require('../../models/user');
const Mensaje = require('../../models/message');

const verifyLength = (str) => str.length > 0;

module.exports = {
  info() {
    return {
      mensaje: 'Welcome to iti-chat-graphql-api',
    };
  },
  async misDatos(_, { name }) {
    try {
      if (!verifyLength(name)) {
        return {
          message: 'The name is required',
        };
      }

      return await User.findOne({ name });
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
};
