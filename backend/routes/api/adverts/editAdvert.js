const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");


// Ruta para editar un anuncio por ID
// PUT api/adverts/edit/:id
router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedData = req.body; // Los datos actualizados se deben enviar en el cuerpo de la solicitud
  
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
  

module.exports = router;