import { useEffect, useState } from "react";
import axios from "axios";

const ListadoAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);

  //TODO: mover llamada a API a un componente
  useEffect(() => {
    axios.get("http://localhost:4000/api/anuncios").then((response) => {
      setAnuncios(response.data.results);
    });
  }, []);
  return (
    <div className="ListadoAnuncios">
      <h1>Hello ducks!</h1>
      <ul>
        {anuncios.map((anuncio) => (
          <li key={anuncio.id}>
            {anuncio.name}
            {anuncio.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListadoAnuncios;
