import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DeleteAd from './DeleteAd';
import { getLatestAdverts } from "./service";

function AdvertsList() {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    // toma la lista de anuncios del backend por axios
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
      })      
      .catch(error => {
        console.error('Error al obtener la lista de anuncios:', error);
      });
  }, []);


  const handleDelete = (deletedAdId) => {
    // Actualizar la lista de anuncios eliminando el anuncio con el ID proporcionado
    setAdverts(prevAdverts => prevAdverts.filter(advert => advert._id !== deletedAdId));
  };

  return (
    <div className="AdvertsList">
      <h1>Hello ducks!</h1>
      <ul>
        {adverts.map(advert => (
          <li key={advert._id}>
            <h3>{advert.title}</h3>
            <p>{advert.description}</p>
            {advert.photo && ( 
        <img
          src={advert.photo}
          alt={`Imagen de ${advert.title}`}
        />
      )}
            <Link to={`/editar-anuncio/${advert._id}`}>Editar Anuncio</Link>
            <DeleteAd id={advert._id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
      <Link to="/create-advert">Crear Anuncio</Link>

    </div>
  );
};

export default AdvertsList;
