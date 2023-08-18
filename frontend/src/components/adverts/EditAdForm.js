import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditAdForm() {
  const { id } = useParams();

  const [adData, setAdData] = useState({
    title: '',
    description: '',
    type: '',
    price: '',
    photo: '',
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
    if (!adData.title) {
      errors.title = 'El título es obligatorio';
    }
    if (!adData.description) {
      errors.description = 'La descripción es obligatoria';
    }
    if (!adData.price) {
      errors.price = 'El precio es obligatorio';
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
            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Escribe el título"
                value={adData.title}
                onChange={handleInputChange}
              />
              {formErrors.title && <Form.Text className="text-danger">{formErrors.title}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Escribe la descripción"
                value={adData.description}
                onChange={handleInputChange}
              />
              {formErrors.description && <Form.Text className="text-danger">{formErrors.description}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formType">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={adData.type}
                onChange={handleInputChange}
              >
                <option value="compra">Compra</option>
                <option value="venta">Venta</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Escribe el precio"
                value={adData.price}
                onChange={handleInputChange}
              />
              {formErrors.price && <Form.Text className="text-danger">{formErrors.price}</Form.Text>}
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

