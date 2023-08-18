import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const advertsUrl = "/api/adverts";

// export const getLatestAdverts = () => {
//   return client.get(advertsUrl);
// };

// En service.js
export const getLatestAdverts = async () => {
  try {
    const response = await client.get(`${advertsUrl}/`);
    console.log('response', response);
    return response; // Devuelve toda la respuesta, no solo response.data
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
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