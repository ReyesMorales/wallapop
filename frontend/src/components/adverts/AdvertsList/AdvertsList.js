import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import Layout from "../../Layout/Layout";
import { EmptyList, ListWithAdverts, Greeting } from './components';
import { useGetAdverts } from './hooks';

const AdvertsList = () => {
  const [adverts, setAdverts] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState(null);
  
useGetAdverts(setAdverts); //este es el hook, hay que pasar parametros

const updateUserInfoFromCookies = () => {
  const cookie = require("js-cookie");
  const usernameFromCookie = cookie.get("user-name");
  setUsername(usernameFromCookie);
};

useEffect(() => {
  // Establece los valores iniciales desde las cookies cuando el componente se monta
  updateUserInfoFromCookies();
}, [username]);


  /**Filtro de Busqueda de Publicaciones */
  const filterPosts = adverts.filter((advert) =>
    (advert.name ?? "").toUpperCase().startsWith(query.toUpperCase())
  );
  
  return (
    <Layout title="Compra y vende cosas de segunda mano">
      <Greeting 
      username={username}
      />
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
          />
        : <EmptyList />
      }
    </Layout>
  );
};

export default AdvertsList;
