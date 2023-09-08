const express = require("express");
const router = express.Router();
const cors = require("cors");

//carga del modelo de anuncio
const Advert = require("../../models/Advert.js");
const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookie = require("cookie-parser");
const { loginrequired } = require("../../config/JWT.js");

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// GET /api/adverts
router.get("/",
//  loginrequired, 
 async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json({ results: adverts });
    console.log(token2);

  } catch (error) {
    console.log(error); //TODO:BORRAR cuando dev termine
    next(error);
  }
});

// Ruta para obtener un anuncio por ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const advert = await Advert.findById(id);
    console.log("Anuncio encontrado:", advert);
    res.json(advert);
  } catch (error) {
    next(error);
  }
});

// Ruta para crear un nuevo anuncio
router.post(
  "/create-advert",
   upload.single('photo'),
  async (req, res, next) => {
    try {
      console.log("Datos enviados desde el frontend:", req.body);
      // Obtener los datos del anuncio desde el cuerpo de la solicitud
      const { name, price, description, type, tags } = req.body;

      // Comprobar si se ha cargado una foto
      let photoFilename;
      if (req.file) {
        photoFilename = req.file.filename;
      } else {
        photoFilename = ""; // Puedes dejar esto en blanco o poner un valor predeterminado
      }

      // Crear un objeto con los datos del anuncio
      const newAdvert = new Advert({
        name,
        price,
        description,
        type,
        tags,
        photo: photoFilename,
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
  }
);


// Ruta para editar un anuncio por ID
router.put("/edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Los datos actualizados se deben enviar en el cuerpo de la solicitud

    // Aquí puedes realizar la validación de datos si es necesario

    // Actualizar el anuncio por su ID y obtener el anuncio actualizado
    const updatedAd = await Advert.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedAd) {
      return res.status(404).json({ message: "Anuncio no encontrado" });
    }

    // Si se actualiza correctamente, devolver el anuncio actualizado
    res.json(updatedAd);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar un anuncio por ID
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await Advert.findByIdAndDelete(id);

    // Si no se encuentra el anuncio, devolvemos un 404
    if (!result) {
      return res.status(404).json({ message: "Anuncio no encontrado" });
    }

    // Si la eliminación es exitosa, devolvemos un 204 sin contenido
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});


module.exports = router;
