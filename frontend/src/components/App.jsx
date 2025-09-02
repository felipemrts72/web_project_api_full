import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './Header/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { checkToken } from '../utils/auth';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function handleCheckToken() {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        try {
          await checkToken(jwt);
          setLoggedIn(true);
          navigate('/');
        } catch (error) {
          console.error('Error [CHECK-TOKEN]', error);
        }
      }
    }

    handleCheckToken();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userEmail'); // se você salvou o email
    setLoggedIn(false);
    navigate('/login');
  }

  return (
    <>
      <div className="page">
        <Header handleLogout={handleLogout} loggedIn={loggedIn} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
