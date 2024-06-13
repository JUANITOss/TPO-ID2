import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderCreate = () => {
  const [cart, setCart] = useState(null);
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [apellidoResponsable, setApellidoResponsable] = useState('');

  // Función para cargar el carrito existente
  const loadCart = async () => {
    try {
      const response = await axios.get('/api/cart'); // Obtener el carrito activo
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  // Cargar el carrito al montar el componente
  useEffect(() => {
    loadCart();
  }, []);

  // Función para convertir el carrito en orden de compra
  const handleConvertCartToOrder = async () => {
    try {
      const response = await axios.post('/api/cartToOrder', {
        nombreResponsable,
        apellidoResponsable
      });
      console.log('Orden de compra creada:', response.data.order);
    } catch (error) {
      console.error('Error al convertir el carrito en orden de compra:', error);
    }
  };

  return (
    <div>
      {cart ? (
        <div>
          <h2>Detalles del Carrito</h2>
          <ul>
            {cart.productos.map((producto, index) => (
              <li key={index}>
                {producto.nombreProducto} - {producto.cantidad} x {producto.precioUnitario}
              </li>
            ))}
          </ul>
          <div>
            <label>
              Nombre Responsable:
              <input
                type="text"
                value={nombreResponsable}
                onChange={(e) => setNombreResponsable(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Apellido Responsable:
              <input
                type="text"
                value={apellidoResponsable}
                onChange={(e) => setApellidoResponsable(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleConvertCartToOrder}>Convertir Carrito a Orden</button>
        </div>
      ) : (
        <p>Cargando carrito...</p>
      )}
    </div>
  );
};

export default OrderCreate;
