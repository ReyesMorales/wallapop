import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login rellenado");

    const newLogin = {
      correo: email,
      contraseña: password,
    };

    console.log("Nuevo Login: ", newLogin);
    axios
      .post("http://localhost:5000/api/anuncios/login", newLogin)
      .then((response) => {
        // Si la petición fue exitosa, establecer el mensaje de éxito
        console.log("Sesion Iniciada");
        // Restablecer los campos del formulario para crear un nuevo anuncio
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
        window.location.href = "http://localhost:3000/lista-anuncios";
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <h3>Iniciar Sesion</h3>
              <p>Descubre que tenemos de nuevo para ti</p>

              <Form.Group controlId="formEmail">
                <Form.Label>Correo Electronico:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Escribe el correo"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <br />

              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  requiredvalue={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <br />
              <Button variant="primary" type="submit">
                Iniciar Sesion
              </Button>

              <br />
              <br />
              <p>
                ¿No tienes una cuenta creada?{" "}
                <Link to="/crear-anuncio">Crea una gratis</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
