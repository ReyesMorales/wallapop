import { useState } from "react";
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
  
useGetAdverts(setAdverts); //este es el hook, hay que pasar parametros

  /**Filtro de Busqueda de Publicaciones */
  const filterPosts = adverts.filter((advert) =>
    (advert.name ?? "").toUpperCase().startsWith(query.toUpperCase())
  );

  const cookie = require("js-cookie");
  const username = cookie.get("user-name");
  const emailToken = cookie.get("email-user");

  
  return (
    <Layout title="Compra y vende cosas de segunda mano">
      <Greeting 
      username={username}
      emailToken={emailToken}
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
