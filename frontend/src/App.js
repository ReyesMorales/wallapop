import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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
            <Route path="/" element={<AdvertsList />} />
            <Route path="/create-advert" element={<CreateAdForm />} />
            <Route path="/editar-anuncio/:id" element={<EditAdForm />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

