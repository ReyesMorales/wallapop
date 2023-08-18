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
router.get("/", async (req, res, next) => {
  try {
    const adverts = await Anuncio.find();
    res.setHeader('Content-Type', 'application/json');
    res.json(adverts);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener un anuncio por ID
router.get("/:id", async (req, res, next) => {
  try {
    const ad = await Anuncio.findById(req.params.id);
    res.json(ad);
  } catch (error) {
    next(error);
  }
});

// Ruta para crear un nuevo anuncio
router.post("/create-advert", upload.single('photo'), async (req, res, next) => {
  try {
    console.log("Datos enviados desde el frontend:", req.body);
    // Obtener los datos del anuncio desde el cuerpo de la solicitud
    const { title, description, type, price, photo } = req.body;

    // Obtener el nombre del archivo del campo de "foto" cargado
    // const photo = req.file.filename;

    // Crear un objeto con los datos del anuncio
    const newAdvert = new Anuncio({
      title,
      description,
      type,
      price,
      photo,
    });

    // Guardar el anuncio en la base de datos
    const savedAdvert = await newAdvert.save();

    // Imprimir un mensaje de registro en la consola para verificar la inserción
    console.log("Anuncio creado con éxito:", savedAdvert);

    // Responder al cliente con un mensaje de éxito
    res.status(201).json({ mensaje: "Anuncio creado con éxito" });
  } catch (error) {
    // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
    console.error("Error al crear el anuncio:", error);
    next(error);
  }
});

// Ruta para editar un anuncio por ID
router.put("/editar-anuncio/:id", async (req, res, next) => {
  try {
    const updatedAd = await Anuncio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedAd);
  } catch (error) {
    next(error)
  }
});

// Ruta para eliminar un anuncio por ID
router.delete("/borrar-anuncio/:id", async (req, res, next) => {
  try {
    const deletedAd = await Anuncio.findByIdAndDelete(req.params.id);
    if (!deletedAd) {
      return res.status(404).json({ error: "Anuncio no encontrado" });
    }
    res.json({ message: "Anuncio eliminado exitosamente" });
  } catch (error) {
    next(error)
  }
});

// Middleware de manejo de errores global
router.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Hubo un error en el servidor" });
});



module.exports = router;

