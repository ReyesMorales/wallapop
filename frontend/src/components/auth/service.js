import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const registerUrl = "/api/adverts";

export const createUser = (newUser) => {
  const formData = new FormData();
  formData.append("name", newUser.name);
  formData.append("number", newUser.number);
  formData.append("email", newUser.email);
  formData.append("gender", newUser.gender);
  formData.append("password", newUser.password);

  return client.post(`${registerUrl}/create-user`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createAd = (newAdvert) => {
  const formData = new FormData();
  formData.append("name", newAdvert.name);
  formData.append("price", newAdvert.price);
  formData.append("description", newAdvert.description);
  formData.append("type", newAdvert.type);
  formData.append("tags", newAdvert.tags);
  formData.append("photo", newAdvert.photo);

  return client.post(`${registerUrl}/create-advert`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
