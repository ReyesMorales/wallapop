import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const advertsUrl = "/api/adverts";

export const getLatestAdverts = () => {
  return client.get(advertsUrl);
};

export const createAd = (newAd) => {
    const formData = new FormData();
    formData.append("title", newAd.title);
    formData.append("description", newAd.description);
    formData.append("type", newAd.type);
    formData.append("price", newAd.price);
    formData.append("photo", newAd.photo);

    return client.post(`${advertsUrl}/create-advert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };