// routes/anuncios.js
const express = require("express");
const router = express.Router();
const Anuncio = require("../models/anuncio");
const multer = require('multer');
const path = require('path');


// Configurar el almacenamiento de archivos con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se almacenarán los archivos
  },
  filename: function (req, file, cb) {
    // Renombrar el archivo para evitar conflictos de nombres
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta para obtener la lista de anuncios
router.get("/lista-anuncios", async (req, res) => {
  try {
    const ads = await Anuncio.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de anuncios" });
  }
});

// Ruta para obtener un anuncio por ID
router.get("/:id", async (req, res) => {
  try {
    const ad = await Anuncio.findById(req.params.id);
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el anuncio" });
  }
});

// Ruta para crear un nuevo anuncio
router.post("/crear-anuncio", upload.single('foto'), async (req, res) => {
  try {
    console.log("Datos enviados desde el frontend:", req.body);
    // Obtener los datos del anuncio desde el cuerpo de la solicitud
    const { titulo, descripcion, tipo, precio } = req.body;

    // Obtener el nombre del archivo del campo de "foto" cargado
    const foto = req.file.filename;

    // Crear un objeto con los datos del anuncio
    const nuevoAnuncio = new Anuncio({
      titulo,
      descripcion,
      
      tipo,
      precio,
      foto,
    });

    // Guardar el anuncio en la base de datos
    const anuncioGuardado = await nuevoAnuncio.save();

    // Imprimir un mensaje de registro en la consola para verificar la inserción
    console.log("Anuncio creado con éxito:", anuncioGuardado);

    // Responder al cliente con un mensaje de éxito
    res.status(201).json({ mensaje: "Anuncio creado con éxito" });
  } catch (error) {
    // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
    console.error("Error al crear el anuncio:", error);

    // Responder al cliente con un mensaje de error
    res
      .status(500)
      .json({
        mensaje:
          "No se pudo crear el anuncio. Hubo un problema en el servidor.",
      });
  }
});

// Ruta para editar un anuncio por ID
router.put("/editar-anuncio/:id", async (req, res) => {
  try {
    const updatedAd = await Anuncio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedAd);
  } catch (error) {
    res.status(500).json({ error: "Error al editar el anuncio" });
  }
});

// Ruta para eliminar un anuncio por ID
router.delete("/borrar-anuncio/:id", async (req, res) => {
  try {
    const deletedAd = await Anuncio.findByIdAndDelete(req.params.id);
    if (!deletedAd) {
      return res.status(404).json({ error: "Anuncio no encontrado" });
    }
    res.json({ message: "Anuncio eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el anuncio" });
  }
});


module.exports = router;
