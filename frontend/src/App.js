import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Desde USER
import Login from './components/user/Login';
import Register from './components/user/Register';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import AddProduct from './components/products/AddProduct';
import ListProduct from './components/products/ListProduct';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/main' element={<Main />}>
          <Route path="/main/addProduct" element={<AddProduct />} />
          <Route path="/main/listProduct" element={<ListProduct />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
