import React from 'react';
import { Link } from 'react-router-dom';
import './estilosCSS/Main.css'; 

const Main = () => {
  return (
    <div className="main-container">
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
            <Link to="/list-order" className="nav-link">Lista de Ordenes :D</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Main;