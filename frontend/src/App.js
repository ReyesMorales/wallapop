import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const ListadoAnuncios = lazy(() =>
  import("./componentes/anuncios/ListadoAnuncios")
);

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/anuncios" element={<ListadoAnuncios />} />
            <Route path="/" element={<Navigate to="/anuncios" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
