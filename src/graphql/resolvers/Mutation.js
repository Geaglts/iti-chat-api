const Usuario = require("../../models/usuario");
const Mensaje = require("../../models/mensaje");
const { NUEVO_MENSAJE } = require("./constants");

const verifyLength = (str) => str.length > 0;

module.exports = {
    async crearUsuario(_, { nombre }) {
        try {
            if (!verifyLength(nombre)) {
                return {
                    estado: "Es necesario que des esto",
                };
            }

            await Usuario.create({ nombre });

            return {
                estado: "Usuario creado correctamente",
            };
        } catch (err) {
            console.log(err);
        }
    },
    async enviarMensaje(_, { input }, { pubsub }) {
        try {
            const mensaje = new Mensaje(input);
            await mensaje.save();
            await Mensaje.find().or([
                { de: input.de },
                { para: input.de },
            ]);
            pubsub.publish(NUEVO_MENSAJE, { nuevoMensaje: mensaje });
            return {
                estado: "Mensaje enviado correctamente.",
            };
        } catch (err) {
            return {
                estado: "No se pudo enviar el mensaje.",
            };
        }
    },
};
