const User = require('../../models/user');

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
};
