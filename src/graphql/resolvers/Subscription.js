const { NUEVO_MENSAJE } = require('../constants');
const { withFilter } = require('apollo-server-express');

module.exports = {
  nuevoMensaje: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => pubsub.asyncIterator(NUEVO_MENSAJE),
      (payload, variables) => {
        const mensaje = payload.nuevoMensaje;

        if (
          String(mensaje.from) === variables.usuario_id ||
          String(mensaje.to) === variables.usuario_id
        ) {
          return true;
        }

        return false;
      }
    ),
  },
};
