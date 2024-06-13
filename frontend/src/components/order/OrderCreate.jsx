import React, { useState, useEffect } from 'react';
import api from '../../api';

const OrderCreate = () => {
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState({
    nombreResponsable: '',
    apellidoResponsable: '',
    dniResponsable: '',
  });

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
    }

    setError(null);

    try {
      console.log({cart,current});
      const response = await api.post('/cart/cartToOrder', {cart,current});
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error al convertir el carrito en orden:', error);
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
    <div>
      <h1>Crear Orden</h1>
      {cart ? (
        <div>
          <h2>Carrito Actual</h2>
          <pre>{JSON.stringify(cart, null, 2)}</pre>
          <div className="mb-4">
            <label className="block text-white mb-2">Nombre:</label>
          <input 
            type="string" 
            name="nombreResponsable" 
            value={current.nombreResponsable} 
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Apellido:</label>
          <input 
            type="string" 
            name="apellidoResponsable" 
            value={current.apellidoResponsable} 
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">DNI:</label>
          <input 
            type="string" 
            name="dniResponsable" 
            value={current.dniResponsable} 
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>
            <br />
          <button onClick={handleSubmit}>Convertir Carrito a Orden</button>
        </div>
      ) : (
        <p>Cargando carrito...</p>
      )}
      {error && <p>{error}</p>}
      {order && (
        <div>
          <h2>Orden Creada</h2>
          <pre>{JSON.stringify(order, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OrderCreate;
