const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");
const upload = require('../../../config/multerConfig');
const { loginrequired } = require('../../../config/JWT');



// Ruta para crear un nuevo anuncio
// POST api/advets/create-advert
router.post(
    "/",
    loginrequired,
    upload.single("photo"),
    async (req, res, next) => {
      console.log("ID del usuario:", res.newUser);
      try {
        console.log("Datos del usuario desde el middleware:", req.user);
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
          owner: res.newUser
        });
        console.log('newAdvert: ', newAdvert);
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