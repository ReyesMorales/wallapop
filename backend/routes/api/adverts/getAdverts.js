const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");

// Ruta para obtener listado de anuncios 
// GET /api/adverts
router.get(
    "/",
    //  loginrequired,
    async (req, res, next) => {
      try {
        const adverts = await Advert.find();
        res.json({ results: adverts });
      } catch (error) {
        console.log(error); //TODO:BORRAR cuando dev termine
        next(error);
      }
    }
  );
  

module.exports = router;