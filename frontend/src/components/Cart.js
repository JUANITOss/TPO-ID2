import React, { useState, useEffect } from 'react';
import api from '../api';

const Cart = () => {
  const [carrito, setCarrito] = useState(null); // Inicializamos el carrito como null
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('/carritos/mi-carrito');
        setCarrito(response.data);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  if (!carrito || !carrito.items) {
    return <div>No hay productos en el carrito</div>; // Mensaje cuando el carrito está vacío o no se carga
  }

  const handleAddProduct = async (productId) => {
    try {
      const response = await api.post(`/carritos/agregar/${productId}`);
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await api.post(`/carritos/eliminar/${productId}`);
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleChangeQuantity = async (productId, quantity) => {
    try {
      const response = await api.post(`/carritos/cambiar-cantidad/${productId}`, { quantity });
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al cambiar cantidad de producto:', error);
    }
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.items.map((item) => (
        <div key={item.productId}>
          <h3>{item.productName}</h3>
          <p>Cantidad: {item.quantity}</p>
          <button onClick={() => handleAddProduct(item.productId)}>Agregar</button>
          <button onClick={() => handleRemoveProduct(item.productId)}>Eliminar</button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleChangeQuantity(item.productId, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Cart;
