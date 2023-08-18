// routes/anuncios.js
const express = require("express");
const router = express.Router();
const Anuncio = require("../models/anuncio");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookie = require("cookie-parser");
require("dotenv").config();
const { loginrequired } = require("../config/JWT");

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

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "diegohs1503@gmail.com",
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Ruta para crear un nuevo nuevo usuario
router.post("/crear-anuncio", async (req, res) => {
  try {
    console.log("Datos enviados desde el frontend:", req.body);
    // Obtener los datos del anuncio desde el cuerpo de la solicitud
    const { nombre, correo, contraseña } = req.body;

    // Crear un objeto con los datos del anuncio
    const nuevoAnuncio = new Anuncio({
      nombre,
      correo,
      contraseña,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });

    const findUser = await Anuncio.findOne({ correo: correo });
    if (findUser) {
      console.log("El correo ya esta registrado en la Base de datos");
      res.status(500).json({
        mensaje: "El correo ya esta registrado en la Base de datos.",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(nuevoAnuncio.contraseña, salt);
      nuevoAnuncio.contraseña = hashPassword;

      //Envio de Correo de Verificacion

      // Guardar el anuncio en la base de datos
      const anuncioGuardado = await nuevoAnuncio.save();

      //Envio de Correo Electronico
      var mailOptions = {
        from: "diegohs1503@gmail.com",
        to: nuevoAnuncio.correo,
        subject: "✅ Verifica tu correo electronico",
        html: `<h2>¡Hola estoy probando los envios automaticos de Correo. Bienvenido,  ${nuevoAnuncio.nombre}</h2>
              <h4> Porfavor, verifique su correo electronico para continuar...</h4>
              <a href="http://${req.headers.host}/anuncios/verify-email?token=${nuevoAnuncio.emailToken}">Verificar Correo</a>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            "El correo de verificacion ha sido enviado correctamente"
          );
        }
      });

      // Imprimir un mensaje de registro en la consola para verificar la inserción
      console.log("Usuario creado con éxito:", anuncioGuardado);

      // Responder al cliente con un mensaje de éxito
      res.status(201).json({ mensaje: "Usuario creado con éxito" });
    }
  } catch (error) {
    // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
    console.error("Error al crear el Usuario:", error);

    // Responder al cliente con un mensaje de error
    res.status(500).json({
      mensaje: "No se pudo crear el Usuario. Hubo un problema en el servidor.",
    });
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
router.post("/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const findUser = await Anuncio.findOne({ correo: correo });
    if (findUser) {
      const match = await bcrypt.compare(contraseña, findUser.contraseña);
      if (match) {
        console.log("Sesion iniciada correctamente. Bien hecho");
        //Crear token
        const token = createToken(findUser.id);
        console.log(token);
        res.cookie("access-token", token);
      } else {
        console.log("Contraseña Invalida");
      }
    } else {
      console.log("No se ha encontrado el usuario");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/verify-email", async (req, res) => {
  try {
    console.log("Proceso de verificacion");
    const token = req.query.token;
    const user = await Anuncio.findOne({ emailToken: token });
    if (user) {
      (user.emailToken = null), (user.isVerified = true), await user.save();
      console.log("Usuario verificado correctamente");
    } else {
      console.log("El usuario no esta verificado");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/crear-anuncio");
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

// Ruta para eliminar un anuncio por ID
router.delete("/borrar-anuncio/:id", async (req, res) => {
  try {
    const deletedAd = await Anuncio.findByIdAndDelete(req.params.id);
    if (!deletedAd) {
      return res.status(404).json({ error: "Anuncio no encontrado" });
    }
    res.json({ message: "Anuncio eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el anuncio" });
  }
});

module.exports = router;
