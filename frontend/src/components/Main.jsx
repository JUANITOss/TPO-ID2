import React from 'react';
import { Link } from 'react-router-dom';
import './estilosCSS/Main.css'; // Ruta correcta para importar el archivo CSS

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
        </ul>
      </nav>
    </div>
  );
};

export default Main;