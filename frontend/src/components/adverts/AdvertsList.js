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

const AdvertsList = () => {
  //TODO: dispatch to props
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    // toma la lista de anuncios del backend por axios
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
    });
  }, []);
  console.log(adverts);
  //TODO: el margen izquierdo de las cards desaparece

  const handleAdDeleted = (deletedId) => {
    // Refresca la lista de anuncios o quita el anuncio de la lista en el estado
    setAdverts((prevAdverts) =>
      prevAdverts.filter((advert) => advert._id !== deletedId)
    );
  };
  //TODO: link a detalle de anuncio solo abarca foto
  return (
    <Layout title="Compra y vende cosas de segunda mano">
      <div>
        <Form>
          <Row className="justify-content-center my-5">
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Buscar en todos los anuncios"
                className=" mr-sm-2"
                style={{ width: "600px" }}
              />
            </Col>
            <Col xs="auto">
              <Button variant="secondary">Buscar</Button>
            </Col>
          </Row>
        </Form>
        {!!adverts.length ? (
          <>
            <Button
              as={Link}
              to="/create-advert"
              style={{
                textDecoration: "none",
                position: "absolute",
                top: "110px",
                right: "140px",
              }}
              variant="dark"
            >
              Crear Anuncio
            </Button>

            <div className="AdvertsList">
              <div className="d-flex justify-content-center">
                <CardGroup>
                  {adverts.map((advert) => (
                    <Card
                      key={advert._id}
                      style={{ width: "18rem" }}
                      className="mb-5 mx-2"
                    >
                      <Card.Header>{advert.type}</Card.Header>
                      <Link to={`/detail/${advert._id}`}>
                        <Card.Img
                          variant="top"
                          src={advert.photo ? advert.photo : placeholderPhoto}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title>{advert.name}</Card.Title>
                        <Card.Text>{advert.description}</Card.Text>
                        <ListGroup variant="flush" bg="primary">
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
      </div>
    </Layout>
  );
};

export default AdvertsList;
