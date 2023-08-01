// db.js
const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/proyecto'; // Cambia "mi-base-de-datos" por el nombre de tu base de datos en MongoDB

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('Error de conexión:', error));
db.once('open', () => console.log('Conexión con la base de datos establecida'));
