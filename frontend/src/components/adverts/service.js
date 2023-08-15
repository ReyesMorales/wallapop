import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const advertsUrl = "/api/adverts";

export const getLatestAdverts = () => {
  return client.get(advertsUrl);
};