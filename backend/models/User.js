const mongoose = require("mongoose");

// Definir el esquema del modelo de Anuncio
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["hombre", "mujer"], required: true },
  password: { type: String, required: true },
  emailToken: { type: String },
  isVerified: { type: Boolean },
});

// Crear el modelo 'Anuncio' a partir del esquema
const User = mongoose.model("users", userSchema);

//exportar el modelo
module.exports = User;
