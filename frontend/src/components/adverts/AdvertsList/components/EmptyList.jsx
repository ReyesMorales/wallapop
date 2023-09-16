import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuthentication } from "../hooks"

export const EmptyList = () => {
  const isLoggedIn = useUserAuthentication();

  return (
    <div>
      <h3>Todavía no hay anuncios... </h3>
      {isLoggedIn ? (
      <Button as={Link} variant="dark" to="/create-advert">
        ¡Publica el primero!
      </Button>
      ) : (
        <p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Regístrate
          </Link>
          {" "}y sé el primero en publicar.
        </p>
      )}
    </div>
  );
}
