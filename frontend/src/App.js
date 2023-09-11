import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const AdvertsList = lazy(() => import("./components/adverts/AdvertsList/AdvertsList"));
const CreateAdvert = lazy(() => import("./components/adverts/CreateAdvert/CreateAdvert"));
const EditAdForm = lazy(() => import("./components/adverts/EditAdForm"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const Register = lazy(() => import("./components/auth/Register"));
const AdvertDetail = lazy(() => import("./components/adverts/AdvertDetail"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/adverts" element={<AdvertsList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail/:advertId" element={<AdvertDetail />} />
            <Route path="/" element={<Navigate to="/adverts" />} />
            <Route path="/create-advert" element={<CreateAdvert />} />
            <Route path="/edit/:id" element={<EditAdForm />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
