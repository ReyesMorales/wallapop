import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { deleteAdvert } from './service'; 
import { useNavigate } from 'react-router-dom';

function DeleteAd({ id, onAdDeleted }) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    deleteAdvert(id)
      .then(response => {
        setShowModal(false);
        setShowSuccessMessage(true);

        onAdDeleted(id); // Informar al componente padre que el anuncio ha sido borrado

      // Redirigir al usuario a la página principal después de 2 segundos
      setTimeout(() => {
        navigate('/');  // Asume que la ruta de la página principal es '/'
      }, 2000);  
      })
      .catch(error => {
        console.error('Error al borrar el anuncio:', error);
        setErrorMessage('Hubo un error al borrar el anuncio. Por favor intenta nuevamente.');
      });
  };

  return (
    <div>
    <Button variant="danger" onClick={() => setShowModal(true)}>Borrar Anuncio</Button>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar borrado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas borrar este anuncio?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
        <Button variant="dark" onClick={handleConfirm}>Confirmar</Button>
      </Modal.Footer>
    </Modal>

    {showSuccessMessage && <Alert variant="success">Anuncio borrado con éxito</Alert>}
    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
  </div>
  );
}

export default DeleteAd;
