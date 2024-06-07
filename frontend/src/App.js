import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import TestConnection from './components/TestConnection';

import api from './api';

function Home() {
  return (
    <div>
      <h1>Welcome to the E-commerce App</h1>
      <p>Select a section from the menu to get started.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="/add-product">Add Product</a>
            </li>
            <li>
              <a href="/order-list">Order List</a>
            </li>
            <li>
              <a href="/product-list">Product List</a>
            </li>
            <li>
              <a href="/test-connections">Test Connections</a>
            </li>
          </ul>
        </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/test-connections" element={<TestConnection />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
