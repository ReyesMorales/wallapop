import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdList from "./components/AdList";
import CreateAdForm from "./components/CreateAdForm";
import EditAdForm from "./components/EditAdForm";
import Login from "./components/login";
import VerifyEmail from "./components/verify-email";

function App() {
  return (
    <div>
      <h1>WallaClone</h1>
      <Router>
        <Routes>
          <Route path="/lista-anuncios" element={<AdList />} />
          <Route path="/crear-anuncio" element={<CreateAdForm />} />
          <Route path="/editar-anuncio/:id" element={<EditAdForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
