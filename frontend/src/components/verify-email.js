import axios from "axios";

function VerifyEmail() {
  axios
    .get("http://localhost:5000/api/anuncios/verify-email")
    .then((response) => {
      // Si la petición fue exitosa, establecer el mensaje de éxito
      console.log("Usuario Verificado correctamente desde el Frontend");
    })
    .catch((error) => {
      // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
      console.log(error);
    });
}

export default VerifyEmail;
