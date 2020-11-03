const { Schema, model } = require("mongoose");

const schemaUsuario = new Schema({
    nombre: {
        type: String,
        unique: true,
    },
    mensajes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Mensaje",
        },
    ],
});

module.exports = model("Usuario", schemaUsuario, "usuarios");
