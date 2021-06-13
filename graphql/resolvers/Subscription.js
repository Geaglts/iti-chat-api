const { NEW_MESSAGE } = require('../constants');
const { withFilter } = require('apollo-server-express');

module.exports = {
  newMessage: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGE),
      (payload, variables, { user }) => {
        if (!user) return false;
        const mensaje = payload.newMessage;
        if (
          String(mensaje.from) === String(user._id) ||
          String(mensaje.to) === String(user._id)
        ) {
          return true;
        }
        return false;
      }
    ),
  },
};
