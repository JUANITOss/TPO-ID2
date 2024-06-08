import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Desde USER
import Login from './components/user/Login';
import Register from './components/user/Register';
import Home from './components/Home';
import TestConnection from './components/TestConnection';

// TODO
// import Cart from './components/Cart';
// import AddProduct from './components/AddProduct';
// import OrderList from './components/OrderList';
// import ProductList from './components/ProductList';
// import TestConnection from './components/TestConnection';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/test' element={<TestConnection />} />
      </Routes>
    </div>
  </Router>

  );
}

export default App;
