import React, { useEffect, useState } from 'react';
import api from '../api';

const UserActivity = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [minutos, setMinutos] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    };

    fetchUsuarios();
  }, []);

  const registrarActividad = async () => {
    await api.post(`/usuarios/${selectedUser}/tiempo`, { minutos: parseInt(minutos, 10) });
    alert('Actividad registrada con éxito');
    setSelectedUser('');
    setMinutos('');
  };

  return (
    <div>
      <h2>Registrar Actividad de Usuario</h2>
      <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
        <option value="">Selecciona un usuario</option>
        {usuarios.map(usuario => (
          <option key={usuario.userId} value={usuario.userId}>
            {usuario.nombre} {usuario.apellido}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Minutos"
        value={minutos}
        onChange={e => setMinutos(e.target.value)}
      />
      <button onClick={registrarActividad}>Registrar</button>
    </div>
  );
};

export default UserActivity;
