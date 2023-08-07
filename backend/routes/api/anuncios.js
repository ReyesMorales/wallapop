const express = require("express");
const router = express.Router();
//carga del modelo de anuncio
const Anuncio = require("../../models/Anuncio.js");

// GET /api/anuncios
router.get("/", async (req, res, next) => {
  try {
    const anuncios = await Anuncio.find();
    console.log(anuncios);
    res.json({ results: anuncios });
  } catch (error) {
    console.log(error); //TODO:BORRAR cuando dev termine
    next(error);
  }
});

module.exports = router;
