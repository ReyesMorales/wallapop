// routes/anuncios.js
const express = require("express");
const router = express.Router();
const Anuncio = require("../models/anuncio");

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
router.post("/crear-anuncio", async (req, res) => {
  try {
    console.log("Datos enviados desde el frontend:", req.body);
    // Obtener los datos del anuncio desde el cuerpo de la solicitud
    const { titulo, descripcion, tipo, precio, foto } = req.body;

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

module.exports = router;
