import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import placeholderPhoto from "../../assets/placeholder.png";
import Layout from "../Layout/Layout";
import DeleteAd from "./DeleteAd";

const AdvertsList = () => {
  //TODO: dispatch to props
  const [adverts, setAdverts] = useState([]);
  const [query, setQuery] = useState("");

  const EmptyList = () => {
    return (
      <div>
        <h3>Todavía no hay anuncios, publica el primero!</h3>
        <Button as={Link} variant="dark" to="/create-advert">
          Crear Anuncio
        </Button>
      </div>
    );
  };

  useEffect(() => {
    // toma la lista de anuncios del backend por axios
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
    });
  }, []);

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

  return (
    <Layout title="Compra y vende cosas de segunda mano">
      <div>
        {username ? (
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
        ) : (
          <h1> </h1>
        )}
      </div>
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
      {!!adverts.length ? (
        <>
          <Link to="/create-advert" style={{ textDecoration: "none" }}>
            <Button variant="dark">Crear Anuncio</Button>
          </Link>
          <br />
          <br />
          <div className="AdvertsList">
            <div className="d-flex justify-content-center">
              <CardGroup>
                {filterPosts.map((advert) => (
                  <Card
                    key={advert._id}
                    style={{ width: "18rem" }}
                    className="mb-5 mx-2"
                  >
                    <Card.Header>{advert.type}</Card.Header>
                    <Card.Img
                      variant="top"
                      src={advert.photo ? advert.photo : placeholderPhoto}
                    />
                    <Card.Body>
                      <Card.Title>{advert.name}</Card.Title>
                      <Card.Text>{advert.description}</Card.Text>
                      <ListGroup variant="flush" bg="dark">
                        <ListGroup.Item>
                          {advert.type === "compra"
                            ? `Compra por: ${advert.price}€`
                            : `Venta por: ${advert.price}€`}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Etiquetas: {advert.tags}
                      </small>
                    </Card.Footer>
                    <Link
                      to={`/edit/${advert._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="dark">Editar</Button>
                    </Link>
                    <DeleteAd onAdDeleted={handleAdDeleted} id={advert._id} />
                  </Card>
                ))}
              </CardGroup>
            </div>
          </div>
        </>
      ) : (
        <EmptyList />
      )}
    </Layout>
  );
};

export default AdvertsList;
