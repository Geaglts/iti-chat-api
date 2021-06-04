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
    async contacts(parent) {
      try {
        const newContactsFormat = parent.contacts.map((contact) => {
          const { _id, ...rest } = contact.toJSON();
          return { id: _id, ...rest, myId: parent._id };
        });
        return newContactsFormat;
      } catch (error) {
        console.log(error);
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
    async lastMessage(parent) {
      try {
        const messages = await Message.find({
          $or: [
            { to: parent.myId, from: parent.userId },
            { from: parent.myId, to: parent.userId },
          ],
        }).sort([['_id', -1]]);
        if (messages.length > 1) {
          return messages[0].message;
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
