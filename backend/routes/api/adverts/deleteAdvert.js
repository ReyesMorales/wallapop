const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");

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