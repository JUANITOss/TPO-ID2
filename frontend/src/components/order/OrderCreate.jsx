import React, { useState, useEffect } from 'react';
import api from '../../api';

const OrderCreate = () => {
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await api.get('/cart/getCart'); // Obtener el carrito activo
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      setError('Error al cargar el carrito');
    }
  };

  const convertCartToOrder = async () => {
    if (!cart) {
      setError('No hay carrito para convertir');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/cart/cartToOrder', {
        nombreResponsable: nombre,
        apellidoResponsable: apellido,
        dni: dni
      });
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error al convertir el carrito en orden:', error);
      setError('Error al convertir el carrito en orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear Orden</h1>
      {cart ? (
        <div>
          <h2>Carrito Actual</h2>
          <pre>{JSON.stringify(cart, null, 2)}</pre>
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <br />
          <label>
            Apellido:
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </label>
          <br />
          <label>
            DNI:
            <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} />
          </label>
          <br />
          <button onClick={convertCartToOrder}>Convertir Carrito a Orden</button>
        </div>
      ) : (
        <p>Cargando carrito...</p>
      )}
      {loading && <p>Convirtiendo carrito en orden...</p>}
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
