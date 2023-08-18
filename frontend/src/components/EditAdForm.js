import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditAdForm() {
  const { id } = useParams();

  const [adData, setAdData] = useState({
    titulo: '',
    descripcion: '',
    tipo: '',
    precio: '',
    foto: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/anuncios/${id}`)
      .then((response) => {
        setAdData(response.data);
      })
      .catch((error) => {
        setErrorMessage('Error al obtener los datos del anuncio. Por favor, inténtalo de nuevo.');
      });
  }, [id]);

  const validateForm = () => {
    const errors = {};
    if (!adData.titulo) {
      errors.titulo = 'El título es obligatorio';
    }
    if (!adData.descripcion) {
      errors.descripcion = 'La descripción es obligatoria';
    }
    if (!adData.precio) {
      errors.precio = 'El precio es obligatorio';
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);

    axios
      .put(`http://localhost:5000/api/anuncios/editar-anuncio/${id}`, adData)
      .then((response) => {
        setSuccessMessage('Anuncio editado con éxito');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error al editar el anuncio. Por favor, inténtalo de nuevo.');
        setSuccessMessage('');
      });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas guardar los cambios?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formTitulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                placeholder="Escribe el título"
                value={adData.titulo}
                onChange={handleInputChange}
              />
              {formErrors.titulo && <Form.Text className="text-danger">{formErrors.titulo}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                placeholder="Escribe la descripción"
                value={adData.descripcion}
                onChange={handleInputChange}
              />
              {formErrors.descripcion && <Form.Text className="text-danger">{formErrors.descripcion}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                name="tipo"
                value={adData.tipo}
                onChange={handleInputChange}
              >
                <option value="compra">Compra</option>
                <option value="venta">Venta</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                placeholder="Escribe el precio"
                value={adData.precio}
                onChange={handleInputChange}
              />
              {formErrors.precio && <Form.Text className="text-danger">{formErrors.precio}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditAdForm;

