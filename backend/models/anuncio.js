const mongoose = require('mongoose');

// Definir el esquema del modelo de Anuncio
const anuncioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
});

// Crear el modelo 'Anuncio' a partir del esquema
const Anuncio = mongoose.model('Anuncio', anuncioSchema);


module.exports = Anuncio;
