const { NUEVO_MENSAJE } = require("./constants");

module.exports = {
    nuevoMensaje: {
        subscribe: (_, __, { pubsub }) =>
            pubsub.asyncIterator([NUEVO_MENSAJE]),
    },
};
