import { Link } from "react-router-dom";
import { Button, CardGroup, Card, ListGroup } from "react-bootstrap";
import placeholderPhoto from "../../../../assets/placeholder.png";
import { useUserAuthentication } from "../hooks"


export const ListWithAdverts = ({ filterPosts }) => {
  const isLoggedIn = useUserAuthentication();

  return (
    <>
      {isLoggedIn && (
        <Link
          to="/create-advert"
          style={{
            textDecoration: "none",
            position: "absolute",
            top: "110px",
            right: "140px",
          }}
        >
          <Button variant="secondary">Crear Anuncio</Button>
        </Link>
      )}
      <br />
      <br />
      <div className="AdvertsList">
        <div className="d-flex justify-content-center">
          <CardGroup>
            {(filterPosts ?? []).map((advert) => (
              <Card
                key={advert._id}
                style={{ minWidth: "18rem", maxWidth: "18rem" }}
                className="mb-5 mx-2"
              >
                <Card.Header>{advert.type}</Card.Header>
                <Link to={`/detail/${advert._id}`}>
                  <Card.Img
                    variant="top"
                    src={
                      advert.photo
                        ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${advert.photo}`
                        : placeholderPhoto
                    }
                  />
                </Link>
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
                  <small className="text-muted">Etiquetas: {advert.tags}</small>
                </Card.Footer>
              </Card>
            ))}
          </CardGroup>
        </div>
      </div>
    </>
  );
}