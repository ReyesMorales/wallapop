import { useState, useEffect } from "react";
import { getAdvert } from "../../service";

export function useFetchAdvert(id) {
  const [adData, setAdData] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
    tags: [],
    photo: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAdvert(id)
      .then((data) => {
        setAdData(prevData => ({ ...prevData, ...data }));
      })
      .catch((error) => {
        setErrorMessage(
          "Error al obtener los datos del anuncio. Por favor, inténtalo de nuevo."
        );
      });
  }, [id]);

  return { adData, setAdData, errorMessage };
}


