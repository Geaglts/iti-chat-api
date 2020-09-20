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
    async enviarMensaje(_, { mensaje: texto, de, para }, { pubsub }) {
        try {
            if (
                !verifyLength(texto) ||
                !verifyLength(de) ||
                !verifyLength(para)
            ) {
                return {
                    estado:
                        "No es posible hacer nada, mande los datos correctos",
                };
            }

            const mensaje = new Mensaje({ mensaje: texto, de, para });
            await mensaje.save();

            const mensajes = await Mensaje.find().or([
                { de: de },
                { para: de },
            ]);

            pubsub.publish(NUEVO_MENSAJE, { nuevoMensaje: mensajes });

            return {
                estado: "Mensaje enviado correctamente",
            };
        } catch (err) {
            console.log(err);
        }
    },
};
