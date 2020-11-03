const Usuario = require("../../models/usuario");
const Mensaje = require("../../models/mensaje");

module.exports = {
    async mensajes(parent) {
        try {
            const mensajes = await Mensaje.find().or([
                { de: parent.id },
                { para: parent.id },
            ]);
            return mensajes;
        } catch (err) {
            console.log(err);
        }
    },
};
