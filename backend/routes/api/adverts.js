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

//Para el Token y la Cookie
require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// GET /api/adverts
router.get("/", loginrequired, async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json({ results: adverts });
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
  // upload.single('photo'),
  async (req, res, next) => {
    try {
      console.log("Datos enviados desde el frontend:", req.body);
      // Obtener los datos del anuncio desde el cuerpo de la solicitud
      const { name, price, description, type, tags, photo } = req.body;

      // Obtener el nombre del archivo del campo de "foto" cargado
      // const photo = req.file.filename;

      // Crear un objeto con los datos del anuncio
      const newAdvert = new Advert({
        name,
        price,
        description,
        type,
        tags,
        photo,
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

// Ruta para crear un nuevo USUARIO
router.post(
  "/create-user",
  // upload.single('photo'),
  async (req, res, next) => {
    try {
      console.log("Datos enviados desde el frontend:", req.body);
      // Obtener los datos del anuncio desde el cuerpo de la solicitud
      const { name, number, email, gender, password } = req.body;

      // Obtener el nombre del archivo del campo de "foto" cargado
      // const photo = req.file.filename;

      // Crear un objeto con los datos del anuncio
      const newUser = new User({
        name,
        number,
        email,
        gender,
        password,
        emailToken: crypto.randomBytes(64).toString("hex"),
        isVerified: false,
      });

      //Verifica si el usuario no se encuentra ya registrado
      const findUser = await User.findOne({ email: email });
      if (findUser) {
        console.log("El correo ya esta registrado en la Base de datos");
        res.status(500).json({
          mensaje: "El correo ya esta registrado en la Base de datos.",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;

        // Guardar el anuncio en la base de datos
        const savedUser = await newUser.save();

        // Imprimir un mensaje de registro en la consola para verificar la inserción
        console.log("Anuncio creado con éxito:", savedUser);

        // Responder al cliente con un mensaje de éxito
        res.status(201).json({ mensaje: "Usuario creado con éxito" });
      }
    } catch (error) {
      // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
      console.error("Error al crear el Usuario:", error);
      next(error);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        console.log("Sesion iniciada correctamente. Bien hecho");
        //Crear token
        const token = createToken(findUser.id);
        console.log("El token de acceso es: ", token);
        res.cookie("access-token", token);
        // Responder al cliente con un mensaje de éxito
        res.status(201).json({ mensaje: "Log In creado con éxito" });
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

router.get("/logout", (req, res) => {
  res.clearCookie("access-token");
});

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
