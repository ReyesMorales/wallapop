// db.js
const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/proyecto'; //proyecto es el nombre de la base de datos provisional. Sustituir al subir al servidor

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('Error de conexión:', error));
db.once('open', () => console.log('Conexión con la base de datos establecida'));
