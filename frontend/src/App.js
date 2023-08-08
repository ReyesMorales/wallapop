import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/anuncios").then((response) => {
      setAnuncios(response.data.results);
    });
  }, []);

  return (
    <div className="App">
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
}

export default App;
