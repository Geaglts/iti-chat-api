const User = require('../../models/user');
const Message = require('../../models/message');
const { NUEVO_MENSAJE } = require('../constants');

const verifyLength = (str) => str.length > 0;

module.exports = {
  async crearUsuario(_, { nombre }) {
    try {
      if (!verifyLength(nombre)) {
        return {
          estado: 'Es necesario que des esto',
        };
      }

      const newUser = await User({ name: nombre });
      await newUser.save();

      return newUser;
    } catch (err) {
      console.log(err);
    }
  },
  async enviarMensaje(_, { input }, { pubsub }) {
    try {
      const mensaje = new Message(input);
      await mensaje.save();
      await Message.find().or([{ from: input.de }, { to: input.de }]);
      pubsub.publish(NUEVO_MENSAJE, { nuevoMensaje: mensaje });
      return {
        estado: 'Mensaje enviado correctamente.',
      };
    } catch (err) {
      return {
        estado: 'No se pudo enviar el mensaje.',
      };
    }
  },
};
