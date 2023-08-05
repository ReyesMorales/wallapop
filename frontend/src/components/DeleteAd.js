import React, { useState } from 'react';
import axios from 'axios';

function DeleteAd({ id, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    // Realizar una solicitud DELETE al backend para eliminar el anuncio
    axios.delete(`http://localhost:5000/api/anuncios/borrar-anuncio/${id}`)
      .then(response => {
        setShowModal(false);
        onDelete(id); // Llamar a la función de borrado en el componente padre
      })
      .catch(error => {
        console.error('Error al borrar el anuncio:', error);
      });
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Borrar Anuncio</button>
      {showModal && (
        <div>
          <p>¿Estás seguro de que deseas borrar este anuncio?</p>
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={() => setShowModal(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default DeleteAd;
