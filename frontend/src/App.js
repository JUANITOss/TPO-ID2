import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Desde USER
import Login from './components/user/Login';
import Register from './components/user/Register';
import LandingPage from './components/LandingPage';
import TestConnection from './components/TestConnection';
import Main from './components/Main';
import CartInfo from './components/cart/CartInfo';
import AddProduct from './components/products/AddProduct';
import ProductList from './components/products/ProductList';

// TODO
// import Cart from './components/Cart';
// import OrderList from './components/OrderList';
// import TestConnection from './components/TestConnection';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path='/' element= {<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/test' element={<TestConnection />} />
        <Route path='/main' element={<Main />} />
        <Route path='/cart-info' element={<CartInfo />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/list-product' element={<ProductList />} />
      </Routes>
    </div>
  </Router>

  );
}

export default App;
