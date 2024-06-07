import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
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
          <Route path="/carrito/:userId" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          {/* Agregar las otras rutas que nos faltan (Productos, Pedidos, Admins, Invoice) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
