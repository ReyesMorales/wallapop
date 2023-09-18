var express = require("express");
var router = express.Router();

//Cerrar Sesion
router.post("/", (req, res) => {
    res.clearCookie("access-token");
    res.clearCookie("email-user");
    res.clearCookie("user-name");
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  });

module.exports = router;



// 3. **Configurar variables de entorno en la instancia AWS**:
//    Una mejor práctica sería configurar las variables de entorno directamente en tu instancia AWS.

//    - Conéctate a tu instancia AWS mediante SSH.
//    - Establece las variables de entorno. Puedes hacerlo agregándolas al archivo `~/.bashrc` o `~/.bash_profile` (para el usuario con el que se ejecuta la aplicación).
//      ```bash
//      echo "export FRONTEND_URL=https://tudominio.com" >> ~/.bashrc
//      source ~/.bashrc
//      ```



