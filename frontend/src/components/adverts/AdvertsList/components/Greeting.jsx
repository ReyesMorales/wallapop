import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Greeting = ({ username, emailToken }) => (
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
