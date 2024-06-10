import React, { useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      
      if (response.status === 200) {
        setMessage('Login successful');
        window.location="/Main";
      } else if(response.status === 400){
        setMessage('');
        setError('Password incorrect');
      }
      
    } catch (error) {
        setError(error.response ? error.response.data.error : 'Invalid username or password');
    }
  };

  return (
  <div className='h-screen w-full flex items-center bg-neutral-800'>
    <div className="mx-auto w-[400px] space-y-6 px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-xl rounded-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-black-900 dark:text-black-900">Login to view our best products</p>
      </div>
      {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
      <div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="username"
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="username"
              placeholder="Juan123"
              required=""
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              required=""
              type="password"
            />
          </div>
            <button
              onClick={handleLogin}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
            >
              Login
            </button>
        </form>
        <div className="mt-4 text-center text-sm">
          You still don't have an account?{" "}
        <Link to='/register'>
          <button className="underline" href="#" rel="ugc">
            Register   
          </button>
        </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
