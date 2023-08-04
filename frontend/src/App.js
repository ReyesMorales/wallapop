import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdList from './components/AdList'; 
import CreateAdForm from './components/CreateAdForm';
import EditAdForm from './components/EditAdForm';


function App() {
  return (
    <div>
      <h1>WallaClone</h1>
      <Router>
        <Routes>
          <Route path="/lista-anuncios" element={<AdList />} />
          <Route path="/crear-anuncio" element={<CreateAdForm />} />
          <Route path="/editar-anuncio/:id" element={<EditAdForm />} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
