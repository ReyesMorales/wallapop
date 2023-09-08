const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookie = require("cookie-parser");

//Configuracion de correos
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "whataduck.project@gmail.com",
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//Para el Token y la Cookie
require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

router.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // Ruta para crear un nuevo USUARIO
router.post(
    "/create-user",
    async (req, res, next) => {
      try {
        console.log("Datos enviados desde el frontend:", req.body);
        // Obtener los datos del anuncio desde el cuerpo de la solicitud
        const { name, number, email, gender, password } = req.body;
  
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
          res.status(409).json({
            mensaje: "El correo ya esta registrado en la Base de datos.",
          });

        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(newUser.password, salt);
          newUser.password = hashPassword;
  
          // Guardar el anuncio en la base de datos
          const savedUser = await newUser.save();
  
          //Envio de Correo Electronico
          var mailOptions = {
            from: "diegohs1503@gmail.com",
            to: newUser.email,
            subject: " What a Duck! 🦆 Verifica tu correo electronico✅",
            html: `<h2>¡Gracias por registrarte en What a Duck! Bienvenido,  ${newUser.name}</h2>
                <h4> Porfavor, verifique su correo electronico para continuar...</h4>
                <a href="http://${req.headers.host}/verify-email?token=${newUser.emailToken}">Verificar Correo</a>`,
          };
  
          // Imprimir un mensaje de registro en la consola para verificar la inserción
          console.log("Usuario creado con éxito:", savedUser);
  
          //Se envia el correo de verificacion
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log(
                "El correo de verificacion ha sido enviado correctamente"
              );
            }
          });
  
          // Responder al cliente con un mensaje de éxito
          res.status(201).json({
            mensaje:
              "Usuario creado con éxito. Verifique su correo electronico para validarlo",
          });
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
  