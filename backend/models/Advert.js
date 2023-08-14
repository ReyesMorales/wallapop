const mongoose = require('mongoose');
const validator = require('validator');

// Definir el esquema del modelo de Anuncio
const advertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['compra', 'venta'], required: true }, 
  price: { type: Number, required: true },
  photo: {
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
const Advert = mongoose.model('Advert', advertSchema);


module.exports = Advert;

