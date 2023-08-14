import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


const AdvertsList = lazy(() => import('./components/adverts/AdvertsList'));
const CreateAdForm = lazy(() => import('./components/adverts/CreateAdForm'));
const EditAdForm = lazy(() => import('./components/adverts/EditAdForm'));

function App() {
  return (
    <div>
      <h1>WallaClone</h1>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/lista-anuncios" element={<AdvertsList />} />
            <Route path="/crear-anuncio" element={<CreateAdForm />} />
            <Route path="/editar-anuncio/:id" element={<EditAdForm />} />
            <Route path="/" element={<Navigate to="/lista-anuncios" />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

