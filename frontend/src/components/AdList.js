import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteAd from './DeleteAd';

function AdList() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener la lista de anuncios
    axios.get('http://localhost:5000/api/anuncios/lista-anuncios')
      .then(response => {
        setAds(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de anuncios:', error);
      });
  }, []);

  const handleDelete = (deletedAdId) => {
    // Actualizar la lista de anuncios eliminando el anuncio con el ID proporcionado
    setAds(prevAds => prevAds.filter(ad => ad._id !== deletedAdId));
  };

  return (
    <div>
      <h2>Lista de Anuncios</h2>
      <ul>
        {ads.map(ad => (
          <li key={ad._id}>
            <h3>{ad.titulo}</h3>
            <p>{ad.descripcion}</p>
            {ad.foto && ( 
        <img
          src={ad.foto}
          alt={`Imagen de ${ad.titulo}`}
        />
      )}
            <Link to={`/editar-anuncio/${ad._id}`}>Editar Anuncio</Link>
            <DeleteAd id={ad._id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
      <Link to="/crear-anuncio">Crear Anuncio</Link>
    </div>
  );
}

export default AdList;
