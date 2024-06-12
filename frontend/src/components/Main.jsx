import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/add-product">Crear Producto</Link>
            </li>
            <li>
              <Link to="/list-product">Ver Productos</Link>
            </li>
            <li>
                <Link to="/list-product">Actualizar Productos</Link>  
            </li>
          </ul>
        </nav>
      </div>

  );
};


// NO ME VUELVAS A CAGAR LA MAIN PAGE PORQUE TE JURO Q TE METO UNA MANO EN EL OJETE
// Y USA UNA STYLESHEET Q PARA ESO EXISTEN BESTIA DE LAS MALAS PRACTICAS
// VUELVO A VER 89Q23875237 DIVS CON ESTILO EN HTML Y ME SUICIDO
export default Main;
