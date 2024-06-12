import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AddProduct from './products/AddProduct';
import ListProduct from './products/ListProduct';

function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/addProduct" component={AddProduct} />
        <Route path="/listProduct" component={ListProduct} />
        <Redirect from="/" to="/addProduct" />
      </Switch>
    </Router>
  );
}

export default Main;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddProduct from './products/AddProduct';
import ProductList from './products/ProductList';
import UpdateProduct from './products/UpdateProduct';
import CartInfo from './cart/CartInfo'; 

const Main = () => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/product-add">Crear Producto</Link>
            </li>
            <li>
              <Link to="/product-list">Ver Productos</Link>
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
          <Route path="/product-add" element={<AddProduct />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
          <Route path="/cart" element={<CartInfo />} /> 
        </Routes>
      </div>

  );
};

export default Main;
