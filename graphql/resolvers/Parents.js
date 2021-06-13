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
    async contacts(parent, _, { user }) {
      try {
        const isMainUser = String(user._id) === String(parent._id);
        if (isMainUser) {
          return parent.contacts;
        }
        return [];
      } catch (error) {
        return [];
      }
    },
  },
  Contact: {
    async user(parent) {
      try {
        const user = await User.findOne({ phone: parent.phone });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    async lastMessage(parent, args, { user }) {
      try {
        const { _id } = await User.findOne({ phone: parent.phone }).select(
          ['_id']
        );
        const messages = await Message.find({
          $and: [
            { $or: [{ to: user._id }, { from: user._id }] },
            { $or: [{ to: _id }, { from: _id }] },
          ],
        }).sort([
          ['hour', 1],
          ['date', 1],
        ]);
        if (messages.length > 1) {
          return messages[messages.length - 1].message;
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
