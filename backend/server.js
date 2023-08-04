// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; 
const db = require('./db'); // Importar la conexión con la base de datos
const anuncioRoutes = require('./routes/anuncios'); // Importar las rutas de anuncios


// Habilita CORS para todas las solicitudes
app.use(cors());

// Middleware para analizar el contenido de las peticiones en formato JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡El servidor backend está funcionando!');
});

// Usar las rutas de anuncios
app.use('/api/anuncios', anuncioRoutes);

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
