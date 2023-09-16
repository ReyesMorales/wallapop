import { Modal, Button } from "react-bootstrap";

function ConfirmationModal({ showModal, handleConfirm, handleCancel }) {
  return(
    <Modal show={showModal} onHide={handleCancel}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmar</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      ¿Estás seguro de que deseas guardar los cambios?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancelar
      </Button>

      <Button variant="dark" onClick={handleConfirm}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default ConfirmationModal;
