const mongoose = require('mongoose');
const validator = require('validator');

// Definir el esquema del modelo de Anuncio
const anuncioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  tipo: { type: String, enum: ['compra', 'venta'], required: true }, 
  precio: { type: Number, required: true },
  foto: {
    type: String,
    // validate: {
    //   validator: (value) => {
        // Utilizamos el método isURL de la librería validator para verificar que la foto sea una URL válida
        // return validator.isURL(value);
    //   },
    //   message: 'La foto debe ser una URL válida',
    // },
  }, 
});

// Crear el modelo 'Anuncio' a partir del esquema
const Anuncio = mongoose.model('Anuncio', anuncioSchema);


module.exports = Anuncio;

