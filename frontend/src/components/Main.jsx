import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post('/login/logout');
      
      if (response.status === 200) {
        // Limpiar la sesión localmente y redirigir a /
        navigate('/');
      } else {
        // Manejar errores si es necesario
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <section className="flex flex-col items-center h-screen bg-neutral-800">
      <div className="self-start mb-20 container grid gap-6 md:gap-8 px-4 md:px-6 bg-neutral-800">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8" style={{ marginTop: '75px' }}>
          <h2 className="text-2xl font-bold tracking-tight text-white">ADMIN VIEW</h2>
          <p className="text-gray-400 max-w-md">
            Press the buttons to access the operatios available.
          </p>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <Link to="/info-cart">
              <button className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48">
                View Cart
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
            >
              Logout
            </button>
          </div>
        </div>
      </div>  

      <div className="flex flex-col items-center bg-neutral-800 justify-center w-full">
        <nav className="w-full">
          <ul className="nav-list grid gap-4 justify-items-center">
            <li>
              <Link
                to="/add-product"
                className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
              >
                Create Product
              </Link>
            </li>
            <li>
              <Link
                to="/list-product"
                className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/update-product"
                className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
              >
                Modify Product
              </Link>
            </li>
            <li>
              <Link
                to="/list-order"
                className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
              >
                My Order
              </Link>
            </li>
            <li>
              <Link
                to="/create-bill"
                className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
              >
                Create Bill
              </Link>
            </li>
            <li>
              <Link
                to="/list-bills"
                className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
              >
                List Bills
              </Link>
            </li>
            <li>
              <Link
                to="/update-bill"
                className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white w-48"
              >
                Update Bill
              </Link>
            </li>
          </ul>
        </nav>
        <p>luispa la avispa is real</p>
      </div>
    </section>
  );
};

export default Main;
