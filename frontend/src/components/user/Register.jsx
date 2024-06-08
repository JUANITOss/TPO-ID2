import React, { useState } from 'react';
import api from '../../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDNI] = useState('');
  const [direccion, setDireccion] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', { username, password, dni, direccion });
      
      if (response.status === 204) {
        setMessage('User registered successfully');
      } else if (response.status == 200) {
        setMessage('User already registered');
      } else {   
        setMessage(response.data.message);
      };
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDNI(e.target.value)} />
      <input type="text" placeholder="Direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      {<p>status: {message}</p>}
    </div>
  );
};

export default Register;
