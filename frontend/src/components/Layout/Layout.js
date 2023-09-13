import { Container } from "react-bootstrap";
import Header from "./Header";

const Layout = ({ title, children }) => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <Container className="flex-fill">
        <h2 className="my-5">{title}</h2>
        {children}
      </Container>
      <footer className="text-center py-3 bg-light">
        &copy; 2023 Mighty Ducks Keepcoding Team
      </footer>
    </div>
  );
};

export default Layout;
