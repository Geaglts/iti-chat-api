const User = require('../../models/user');
const Message = require('../../models/message');

module.exports = {
  Message: {
    async from(parent) {
      try {
        return await User.findById(parent.from);
      } catch (err) {
        console.log(err);
      }
    },
    async to(parent) {
      try {
        return await User.findById(parent.to);
      } catch (err) {
        console.log(err);
      }
    },
  },
  User: {
    async messages(parent) {
      try {
        const mensajes = await Message.find().or([
          { from: parent.id },
          { to: parent.id },
        ]);
        return mensajes;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Contact: {
    async user(parent) {
      try {
        const user = await User.findById(parent.userId);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
