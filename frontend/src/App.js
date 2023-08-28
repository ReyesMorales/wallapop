import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const AdvertsList = lazy(() => import("./components/adverts/AdvertsList"));
const CreateAdForm = lazy(() => import("./components/adverts/CreateAdForm"));
const EditAdForm = lazy(() => import('./components/adverts/EditAdForm'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/adverts" element={<AdvertsList />} />
            <Route path="/" element={<Navigate to="/adverts" />} />
            <Route path="/create-advert" element={<CreateAdForm />} />
            <Route path="/edit/:id" element={<EditAdForm />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;


