import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteAdvert } from './service'; 
import { toast } from 'react-toastify';

function DeleteAd({ id, onAdDeleted }) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    deleteAdvert(id)
      .then(response => {
        toast.success("Anuncio borrado con éxito"); // Muestra un toast de éxito
        onAdDeleted(id); // Informar al componente padre que el anuncio ha sido borrado
      })
      .catch(error => {
        console.error('Error al borrar el anuncio:', error);
        toast.error("Hubo un error al borrar el anuncio. Por favor intenta nuevamente."); // Muestra un toast de error
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
  </div>
  );
}
    

export default DeleteAd;
