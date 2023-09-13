require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../../../models/User.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../../../utils/userHelpers");

router.post("/", async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ email: email });
      if (findUser) {
        const match = await bcrypt.compare(password, findUser.password);
        if (match) {
          console.log("Sesion iniciada correctamente. Bien hecho");
          //Crear token
          const token = createToken(findUser.id);
          const nameUser = findUser.name;
          const emailUser = findUser.email;
          console.log("El token de acceso es: ", token);
          res.cookie("access-token", token);
          res.cookie("user-name", nameUser);
          res.cookie("email-user", emailUser);
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
  
  module.exports = router;