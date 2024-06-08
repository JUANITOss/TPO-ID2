import React, { useState } from 'react';
import api from '../../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { username, password });
      
      if (response.status === 200) {
        setMessage('Login successful');
      } else {
        setMessage(response.data.error);
      }
      
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Error logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {message && <p>Status: {message}</p>}
    </div>
  );
};

export default Login;
