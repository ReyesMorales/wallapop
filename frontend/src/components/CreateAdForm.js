import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import axios from "axios";

function CreateAdForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para almacenar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para almacenar el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para almacenar mensajes de error de validacion
  const [formErrors, setFormErrors] = useState({});

  // Estado para controlar la visibilidad del Modal
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const errors = {};
    // Comprobaciones para cada campo requerido
    if (!name) {
      errors.name = "El título es obligatorio";
    }
    if (!email) {
      errors.email = "La descripción es obligatoria";
    }
    if (!password) {
      errors.password = "La contraseña es obligatoria";
    }

    // Actualiza el estado de los errores de validación
    setFormErrors(errors);

    // Devuelve true si no hay errores, de lo contrario, devuelve false
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza la validación del formulario antes de enviar la solicitud
    if (validateForm()) {
      // Mostrar el Modal de confirmación
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    // Cerrar el Modal de confirmación
    setShowModal(false);

    // Crear el objeto que representa el nuevo anuncio
    const newAd = {
      nombre: name,
      correo: email,
      contraseña: password,
    };

    console.log("newAd", newAd);

    // Realizar la petición POST al backend
    axios
      .post("http://localhost:5000/api/anuncios/crear-anuncio", newAd)
      .then((response) => {
        // Si la petición fue exitosa, establecer el mensaje de éxito
        setSuccessMessage("Anuncio creado con éxito");
        setErrorMessage("");
        // Restablecer los campos del formulario para crear un nuevo anuncio
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
        setErrorMessage(
          "Error al crear el anuncio. Por favor, inténtalo de nuevo."
        );
        setSuccessMessage("");
      });
  };

  const handleCancel = () => {
    // Cerrar el Modal de confirmación sin hacer ninguna acción
    setShowModal(false);
  };

  // Lógica para manejar el envío del formulario y crear el anuncio

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          {/* Agregar el Modal de confirmación */}
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
              <Button variant="primary" onClick={handleConfirm}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Agregar un componente Alert para mostrar el mensaje de éxito */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {/* Agregar un componente Alert para mostrar el mensaje de error */}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <h3>Crear nuevo usuario</h3>
            <p>Es rapido y sencillo, no tiene ninguna complicacion</p>
            <Form.Group controlId="formTitle">
              <Form.Label>Nombre y Apellido:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre y apellido"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && (
                <Form.Text className="text-danger">{formErrors.name}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electronico:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Escribe el correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && (
                <Form.Text className="text-danger">
                  {formErrors.email}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && (
                <Form.Text className="text-danger">
                  {formErrors.password}
                </Form.Text>
              )}
            </Form.Group>

            <br />
            <Button variant="primary" type="submit">
              Crear Anuncio
            </Button>
            <br />
            <br />
            <Link to="/lista-anuncios">Lista de Anuncios</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAdForm;
