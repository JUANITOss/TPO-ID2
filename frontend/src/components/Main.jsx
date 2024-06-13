import React from 'react';
import { Link } from 'react-router-dom';
import './estilosCSS/Main.css'; 

const Main = () => {
  return (
    <div className='h-screen w-full flex items-center bg-neutral-800'>
    <div className="mx-auto w-[400px] space-y-6 px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-xl rounded-md">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/add-product" className="nav-link">Crear Producto</Link>
          </li>
          <li>
            <Link to="/list-product" className="nav-link">Ver Productos</Link>
          </li>
          <li>
            <Link to="/update-product" className="nav-link">Actualizar Productos</Link>
          </li>
          <li>
            <Link to="/info-cart" className="nav-link">Ver Carrito</Link>
          </li>
          <li>
<<<<<<< HEAD
            <Link to="/list-order" className="nav-link">Lista de Ordenes :D</Link>
=======
            <Link to="/list-order" className="nav-link">Ver Order</Link>
>>>>>>> c0a82dd9b85e45e53b236ab09f0edc0057d19f71
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default Main;