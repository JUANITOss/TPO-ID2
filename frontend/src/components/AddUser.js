import React, { useState } from 'react';
import api from '../api';

const AddUser = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [documentoIdentidad, setDocumentoIdentidad] = useState('');

  const agregarUsuario = async () => {
    const nuevoUsuario = {
      nombre,
      apellido,
      direccion,
      documentoIdentidad
    };

    await api.post('/usuarios', nuevoUsuario);
    setNombre('');
    setApellido('');
    setDireccion('');
    setDocumentoIdentidad('');
  };

  return (
    <div>
      <h2>Agregar Usuario</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
      <input type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
      <input type="text" placeholder="Documento de Identidad" value={documentoIdentidad} onChange={e => setDocumentoIdentidad(e.target.value)} />
      <button onClick={agregarUsuario}>Agregar</button>
    </div>
  );
};

export default AddUser;
