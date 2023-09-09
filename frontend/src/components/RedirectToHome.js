import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

function RedirectToHome({ delay = 2000 }) {
    const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/');
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, delay]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" role="status">
      </Spinner>
    </div>
  );
}

export default RedirectToHome;
