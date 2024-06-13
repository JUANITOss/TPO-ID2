import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/user/Login';
import Register from './components/user/Register';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import AddProduct from './components/product/AddProduct';
import ListProduct from './components/product/ListProduct';
import UpdateProduct from './components/product/UpdateProduct';
import CartInfo from './components/cart/CartInfo';
import OrderList from './components/order/OrderList';
import BillList from './components/bill/BillList';
import BillForm from './components/bill/BillForm';
import UpdateBillForm from './components/bill/UpdateBillForm';

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
          <Route path='/info-cart' element={<CartInfo />}/>
          <Route path='/list-order' element={<OrderList/>}/>
          <Route path="/list-bills" element={<BillList />} />
          <Route path="/create-bill" element={<BillForm />} />
          <Route path="/update-bill" element={<UpdateBillForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
