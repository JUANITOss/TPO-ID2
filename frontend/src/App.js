import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Habria que ver la forma de separar rutas admin de user, para implementacion futura
import Login from './components/user/Login';
import Register from './components/user/Register';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import AddProduct from './components/product/AddProduct';
import ListProduct from './components/product/ListProduct';
import UpdateProduct from './components/product/UpdateProduct';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/main' element={<Main />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/list-product" element={<ListProduct />} />
          <Route path='/update-product/:productId?' element={<UpdateProduct />}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
