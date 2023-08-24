import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const advertsUrl = "/api/adverts";

export const getLatestAdverts = () => {
  return client.get(advertsUrl);
};

export const getAdvert = (advertId) => {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
};

export const createAd = (newAdvert) => {
  console.log("Datos a enviar al servidor desde service:", newAdvert);
  const formData = new FormData();
  formData.append("name", newAdvert.name);
  formData.append("price", newAdvert.price);
  formData.append("description", newAdvert.description);
  formData.append("type", newAdvert.type);
  formData.append("tags", newAdvert.tags);
  formData.append("photo", newAdvert.photo);

  return client.post(`${advertsUrl}/create-advert`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };