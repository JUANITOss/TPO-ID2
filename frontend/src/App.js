import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import UserActivity from './components/UserActivity';
import Cart from './components/Cart';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import TestConnection from './components/TestConnection';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Usuarios</Link>
            </li>
            <li>
              <Link to="/add-user">Agregar Usuario</Link>
            </li>
            <li>
              <Link to="/user-activity">Actividad de Usuario</Link>
            </li>
            <li>
              <Link to="/cart">Carrito</Link>
            </li>
            <li>
              <Link to="/orders">Pedidos</Link>
            </li>
            <li>
              <Link to="/products">Productos</Link>
            </li>
            <li>
              <Link to="/add-product">Agregar Producto</Link>
            </li>
            <li>
              <Link to="/test-connection">Probar Conexión</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/user-activity" element={<UserActivity />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/test-connection" element={<TestConnection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
