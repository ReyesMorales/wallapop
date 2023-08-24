const express = require("express");
const router = express.Router();
const cors = require("cors");
//carga del modelo de anuncio
const Advert = require("../../models/Advert.js");

router.use(cors());

// GET /api/adverts
router.get("/", async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json({ results: adverts });
  } catch (error) {
    console.log(error); //TODO:BORRAR cuando dev termine
    next(error);
  }
});

// Ruta para crear un nuevo anuncio
router.post("/create-advert", 
// upload.single('photo'), 
async (req, res, next) => {
  try {
    console.log("Datos enviados desde el frontend:", req.body);
    // Obtener los datos del anuncio desde el cuerpo de la solicitud
    const { name, price, description, type, tags, photo } = req.body;

    // Obtener el nombre del archivo del campo de "foto" cargado
    // const photo = req.file.filename;

    // Crear un objeto con los datos del anuncio
    const newAdvert = new Advert({
      name,
      price,
      description,
      type,
      tags,
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

module.exports = router;
