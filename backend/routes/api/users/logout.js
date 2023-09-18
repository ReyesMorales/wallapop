var express = require("express");
var router = express.Router();

//Cerrar Sesion
router.get("/", (req, res) => {
    res.clearCookie("access-token");
    res.clearCookie("email-user");
    res.clearCookie("user-name");
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  });

module.exports = router;