const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");
const upload = require('../../../config/multerConfig');


// Ruta para crear un nuevo anuncio
// POST api/advets/create-advert
router.post(
    "/",
    upload.single("photo"),
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
  

module.exports = router;