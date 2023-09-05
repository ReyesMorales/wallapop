require("dotenv").config();

const mongoose = require("mongoose");

// suscripcion a eventos de errores
mongoose.connection.on("error", (err) => {
  console.log("Error de conexion", err);
});

// suscripcion al evento de conexion
mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

//conexion a DB
mongoose.connect(process.env.MONGODB_CONNECTION_STR);

module.exports = mongoose.connection;
