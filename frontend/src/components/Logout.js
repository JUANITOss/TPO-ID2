// src/components/Logout.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('/api/users/logout');
        navigate('/login');
      } catch (error) {
        console.error('Error al cerrar sesión', error);
      }
    };

    logout();
  }, [navigate]);

  return <div>Cerrando sesión...</div>;
};

export default Logout;
