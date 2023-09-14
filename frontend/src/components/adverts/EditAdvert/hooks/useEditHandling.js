import { useState } from "react";
import { editAdvert } from "../../service";

export function useEditHandling(id, data) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleEdit = () => {
    editAdvert(id, data)
      .then(() => {
        setSuccessMessage("Anuncio editado con éxito");
        setErrorMessage("");
        setTimeout(() => {
          setRedirectToHome(true);
        }, 2000);
      })
      .catch(() => {
        setErrorMessage(
          "Error al editar el anuncio. Por favor, inténtalo de nuevo."
        );
        setSuccessMessage("");
      });
  };

  return { successMessage, errorMessage, handleEdit, redirectToHome };
}


