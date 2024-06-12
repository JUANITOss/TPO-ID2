// src/components/CartInfo.jsx
import React, { useState, useEffect } from 'react';

const CartInfo = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/cart'); // Endpoint para obtener el carrito del usuario actual
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h2>Detalles del Carrito</h2>
      {cart ? (
        <div>
          <p>Usuario: {cart.userId}</p>
          <p>Estado: {cart.estado}</p>
          <h3>Productos:</h3>
          <ul>
            {cart.productos.map((producto, index) => (
              <li key={index}>
                <p>Nombre: {producto.nombreProducto}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio Unitario: ${producto.precioUnitario}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CartInfo;
