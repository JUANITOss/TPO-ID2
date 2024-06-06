import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestConnection = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/test');
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Error al conectar con el backend');
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h2>Prueba de Conexión</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestConnection;
