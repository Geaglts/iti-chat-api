const Usuario = require("../../models/usuario");
const Mensaje = require("../../models/mensaje");

const verifyLength = (str) => str.length > 0;

module.exports = {
    info() {
        return {
            mensaje: "Este es el servidor de la app incognito",
        };
    },
    async misDatos(_, { nombre }) {
        try {
            if (!verifyLength(nombre)) {
                return {
                    estado: "El nombre es requerido",
                };
            }

            return await Usuario.findOne({ nombre });
        } catch (err) {
            console.log(err);
        }
    },
    async usuarios() {
        try {
            return await Usuario.find();
        } catch (err) {
            console.log(err);
        }
    },
};
