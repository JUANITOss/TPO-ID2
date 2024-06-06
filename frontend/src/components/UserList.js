import React, { useState, useEffect } from 'react';
import api from '../api';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.userId}>{usuario.nombre} {usuario.apellido}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
