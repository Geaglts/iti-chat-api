const { Schema, model } = require("mongoose");

const schemaMensaje = new Schema({
    mensaje: {
        type: String,
    },
    de: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
});

module.exports = model("Mensaje", schemaMensaje, "mensajes");
