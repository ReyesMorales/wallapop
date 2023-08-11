const express = require("express");
const router = express.Router();
const corst = require("cors");
//carga del modelo de anuncio
const Anuncio = require("../../models/Anuncio.js");

router.use(corst());

// GET /api/anuncios
router.get("/", async (req, res, next) => {
  try {
    const anuncios = await Anuncio.find();
    res.json({ results: anuncios });
  } catch (error) {
    console.log(error); //TODO:BORRAR cuando dev termine
    next(error);
  }
});

module.exports = router;
