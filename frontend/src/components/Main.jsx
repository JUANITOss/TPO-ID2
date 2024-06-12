import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddProduct from './products/AddProduct';
import ProductList from './products/ProductList';
import UpdateProduct from './products/UpdateProduct';
import CartInfo from './cart/CartInfo'; 

const Main = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/create-product">Crear Producto</Link>
            </li>
            <li>
              <Link to="/products">Ver Productos</Link>
            </li>
            <li>
              <Link to="/cart">Ver Carrito</Link>
            </li>
            <li>
              <Link to="/update-product/:productId">Actualizar producto(proximamente)</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create-product" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
          <Route path="/cart" element={<CartInfo />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
