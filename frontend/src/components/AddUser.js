import React, { useState } from 'react';
import api from '../api';

const AddUser = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [direccion, setDireccion] = useState('');
  const [documentoIdentidad, setDocumentoIdentidad] = useState('');
  const [condicionIVA, setCondicionIVA] = useState('');

  const agregarUsuario = async () => {
    const nuevoUsuario = {
      userId: `user-${Date.now()}`,
      nombre,
      apellido,
      contrasenia,
      direccion,
      documentoIdentidad,
      condicionIVA,
      tiempoConectado: []
    };

    await api.post('/usuarios', nuevoUsuario);
    setNombre('');
    setApellido('');
    setDireccion('');
    setDocumentoIdentidad('');
    setCondicionIVA('');
  };

  return (
    <div>
      <h2>Agregar Usuario</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
      <input type="text" placeholder="Contraseña" value={contrasenia} onChange={e => setContrasenia(e.target.value)} />
      <input type="text" placeholder="Dirección (Calle)" value={direccion} onChange={e => setDireccion(e.target.value)} />
      <input type="text" placeholder="DNI" value={documentoIdentidad} onChange={e => setDocumentoIdentidad(e.target.value)} />
      <input type="text" placeholder="Condición ante IVA" value={condicionIVA} onChange={e => setCondicionIVA(e.target.value)} />
      <button onClick={agregarUsuario}>Agregar</button>
    </div>
  );
};

export default AddUser;
