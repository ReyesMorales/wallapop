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
mongoose.connect("mongodb://127.0.0.1:27017/wallapop");

module.exports = mongoose.connection;
