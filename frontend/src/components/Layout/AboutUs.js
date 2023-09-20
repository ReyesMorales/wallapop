import React from 'react';
import { Container } from "react-bootstrap";
import Layout from "./Layout"

function AboutUs() {
  return (
    <Layout>
    <Container>
      <h1>Quiénes somos</h1>
      <p>
      ¡Bienvenidos a "What a Duck!"! Nacimos de la idea de conectar a las personas de una misma comunidad a través de una plataforma intuitiva y amigable. Aquí, puedes comprar o vender artículos de segunda mano a personas en tu misma área, facilitando transacciones rápidas y locales. Pero, ¿por qué de segunda mano?
      
      En "What a Duck!", creemos en un mundo más sostenible. Cada vez que reutilizas un artículo, no solo estás ahorrando dinero, sino que estás contribuyendo a reducir la huella de carbono, evitando la producción y transporte de nuevos productos. Es una manera simple, pero poderosa, de cuidar nuestro planeta mientras satisfaces tus necesidades diarias.Porque al final del día, todos los pequeños esfuerzos cuentan. Y si todos aportamos nuestro granito de arena, juntos podemos marcar la diferencia. Así que, ya sea que estés aquí para encontrar esa lámpara vintage perfecta o para vender aquel libro que ya leíste, te damos la bienvenida a esta comunidad de cambio consciente.
      
      Gracias por ser parte de esta misión. 🌎🦆
      </p>
    </Container>
    </Layout>
  );
}

export default AboutUs;
