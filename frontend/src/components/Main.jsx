import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/main/addProduct">Crear Producto</Link>
            </li>
            <li>
              <Link to="/main/listProduct">Ver Productos</Link>
            </li>
          </ul>
        </nav>
      </div>

  );
};

export default Main;
