const Usuario = require("../../models/usuario");
const Mensaje = require("../../models/mensaje");

module.exports = {
    Mensaje: {
        async de(parent) {
            try {
                return await Usuario.findById(parent.de);
            } catch (err) {
                console.log(err);
            }
        },
        async para(parent) {
            try {
                return await Usuario.findById(parent.para);
            } catch (err) {
                console.log(err);
            }
        },
    },
    Usuario: {
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
    },
};
