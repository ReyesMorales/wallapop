const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");

// Ruta para obtener un anuncio por ID 
// GET api/adverts/:id
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

module.exports = router;