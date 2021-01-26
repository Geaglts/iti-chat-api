if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const mongoose = require("mongoose");

module.exports = mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Conexion exitosa a la base de datos");
    })
    .catch((e) => {
        console.log("No se pudo conectar a la base de datos");
    });
