import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const EmptyList = () => (
    <div>
      <h3>Todavía no hay anuncios, publica el primero!</h3>
      <Button as={Link} variant="dark" to="/create-advert">
        Crear Anuncio
      </Button>
    </div>
  );
