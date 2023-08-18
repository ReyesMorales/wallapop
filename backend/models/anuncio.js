const mongoose = require("mongoose");
const validator = require("validator");

// Definir el esquema del modelo de Anuncio
const anuncioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  emailToken: { type: String },
  isVerified: { type: Boolean },
});

// Crear el modelo 'Anuncio' a partir del esquema
const Anuncio = mongoose.model("Usuario", anuncioSchema);

module.exports = Anuncio;
