import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { EmptyList, ListWithAdverts } from './components';
import { useGetAdverts } from './hooks';

const AdvertsList = () => {
  const [adverts, setAdverts] = useState([]);
  const [query, setQuery] = useState("");
  
useGetAdverts(setAdverts); //este es el hook, hay que pasar parametros

  const handleAdDeleted = (deletedId) => {
    // Refresca la lista de anuncios o quita el anuncio de la lista en el estado
    setAdverts((prevAdverts) =>
      prevAdverts.filter((advert) => advert._id !== deletedId)
    );
  };

  /**Filtro de Busqueda de Publicaciones */
  const filterPosts = adverts.filter((advert) =>
    (advert.name ?? "").toUpperCase().startsWith(query.toUpperCase())
  );

  const cookie = require("js-cookie");
  const username = cookie.get("user-name");
  const emailToken = cookie.get("email-user");

  const Greeting = () => (
    <div>
      {username && (
        <div
          className="hidden"
          style={{
            padding: "30px",
            width: "500px",
            margin: "0 auto",
            borderRadius: "30px",
            backgroundColor: "#CEFE98",
          }}
        >
          <h5>Hola {username}, Bienvenido de vuelta</h5>
          <h6>Sesion Iniciada con {emailToken}</h6>
          <br />
          <Link to="http://localhost:4000/logout">
            <Button variant="dark">Cerrar Sesion</Button>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <Layout title="Compra y vende cosas de segunda mano">
      <Greeting />
      <Form>
        <Row className="justify-content-center my-5">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Buscar en todos los anuncios"
              className=" mr-sm-2"
              style={{ width: "600px" }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="dark">Buscar</Button>
          </Col>
        </Row>
      </Form>
      {
        adverts.length > 0 ?
          <ListWithAdverts
            username={username}
            filterPosts={filterPosts}
            handleAdDeleted={handleAdDeleted}
          />
        : <EmptyList />
      }
    </Layout>
  );
};

export default AdvertsList;
