// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [dni, setDNI] = useState('');
  const [ direccion, setDireccion] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>User:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>DNI:</label>
          <input type="dni" value={dni} onChange={(e) => setDNI(e.target.value)} />
        </div>
        <div>
          <label>Direccion:</label>
          <input type="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
