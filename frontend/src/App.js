import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SessionTime from './components/SessionTime';
import api from './api';

const ProtectedRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/usuarios/session');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<React.Fragment><Login /><Register /></React.Fragment>} />
          <Route path="/carrito/:userId" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/session-time" element={<SessionTime />} />
          {/* AGREGAR RUTAS FALTANTES */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
