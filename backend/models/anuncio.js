const mongoose = require("mongoose");

// Definir el esquema del modelo de Anuncio
const anuncioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  sell: { type: Boolean, required: true },
  tags: { type: [String], required: true },
  photo: String,
});

// Crear el modelo 'Anuncio' a partir del esquema
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
