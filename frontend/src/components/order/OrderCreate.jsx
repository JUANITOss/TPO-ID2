import React, { useState, useEffect } from 'react';
import api from '../../api';
import {Link, useNavigate} from 'react-router-dom';

const OrderCreate = () => {
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState({
    nombreResponsable: '',
    apellidoResponsable: '',
    dniResponsable: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('/cart/getCart');
        setCart(response.data);
       
      } catch (err) {
        setError(err);
      }
    };
    fetchCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart) {
      setError('No hay carrito para convertir');
      return;
    } else {
      alert("Order created succesfully")
    }

    setError(null);

    try {

      const response = await api.post('/cart/cartToOrder', {cart,current});
      setOrder(response.data.order);
      //navigate('/main');

    } catch (error) {
      console.error('Error al convertir aaaaaaaaaaaaaaaaaaaaaaaaaaael carrito en orden:', error);
      setError('Error al convertir el carrito en orden');
    }
  };

  const handleChange = (e) => {
    setCurrent({
      ...current,
      [e.target.name]: e.target.value
    });
  };


 
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-neutral-800">
    <div className="flex items-center justify-between">
     <h1 className="text-white text-2xl font-bold">Create Order</h1>
      <div className="flex items-center justify-self-end space-x-4">
     <Link to="/Main">
       <button 
        className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
            Home
      </button>
    </Link>
    </div>
    </div>
    <div className="overflow-auto h-screen bg-neutral-800">
        <div className="mb-4">
        <label className="block text-white mb-2">Name:</label>
        <input 
          type="text" 
          name="nombreResponsable" 
          value={current.nombreResponsable} 
          onChange={handleChange} 
          className='w-full px-3 py-2 border border-gray-300 rounded-md'/>
         </div>

         <div className="mb-4">
        <label className="block text-white mb-2">Last Name:</label>
        <input 
          type="text" 
          name="apellidoResponsable" 
          value={current.apellidoResponsable} 
          onChange={handleChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
         </div>

         <div className="mb-4">
        <label className="block text-white mb-2">DNI:</label>
        <input 
          type="number" 
          name="dniResponsable" 
          value={current.dniResponsable} 
          onChange={handleChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
         </div>
         
         <button 
          onClick={handleSubmit} 
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white'
        >
          Convert Cart to Order
        </button>
        </div>
    </div>
  );
}


export default OrderCreate;
