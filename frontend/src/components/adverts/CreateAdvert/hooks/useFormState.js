import { useState } from "react";

export const useFormState = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("compra");
  const [tags, setTags] = useState("");
  const [photo, setPhoto] = useState("");

  return {
    name, setName,
    price, setPrice,
    description, setDescription,
    type, setType,
    tags, setTags,
    photo, setPhoto
  };
}

