import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post('/usuarios/logout');
        navigate('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };
    logout();
  }, [navigate]);

  return <div>Cerrando sesión...</div>;
};

export default Logout;
