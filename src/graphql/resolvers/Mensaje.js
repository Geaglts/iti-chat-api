const Usuario = require("../../models/usuario");
const Mensaje = require("../../models/mensaje");

module.exports = {
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
};
