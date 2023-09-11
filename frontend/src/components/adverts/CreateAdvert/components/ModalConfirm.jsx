import { Button, Modal } from "react-bootstrap";

export const ModalConfirm = ({ showModal, handleCancel, handleConfirm }) => (
    <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
            <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro de que deseas crear el anuncio?
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
  )