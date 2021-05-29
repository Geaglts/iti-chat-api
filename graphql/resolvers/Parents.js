const Usuario = require('../../models/user');
const Mensaje = require('../../models/message');

module.exports = {
  Message: {
    async from(parent) {
      try {
        return await Usuario.findById(parent.from);
      } catch (err) {
        console.log(err);
      }
    },
    async to(parent) {
      try {
        return await Usuario.findById(parent.to);
      } catch (err) {
        console.log(err);
      }
    },
  },
  User: {
    async messages(parent) {
      try {
        const mensajes = await Mensaje.find().or([
          { from: parent.id },
          { to: parent.id },
        ]);
        return mensajes;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
