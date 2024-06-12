import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const Cart = () => {
  const { userId } = useParams();
  const [carrito, setCarrito] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    productoId: '',
    nombreProducto: '',
    cantidad: 1,
    precioUnitario: 0,
  });

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await api.get(`/carritos/${userId}`);
        setCarrito(response.data[0] || { cartId: null, productos: [] });
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };
    fetchCarrito();
  }, [userId]);

  const handleAgregarProducto = async () => {
    if (!carrito.cartId) {
      console.error('No se puede agregar producto. Carrito no encontrado.');
      return;
    }

    try {
      const response = await api.post(`/carritos/${carrito.cartId}/productos`, nuevoProducto);
      setCarrito(response.data);
      setNuevoProducto({ productoId: '', nombreProducto: '', cantidad: 1, precioUnitario: 0 });
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleEliminarProducto = async (productoId) => {
    if (!carrito.cartId) {
      console.error('No se puede eliminar producto. Carrito no encontrado.');
      return;
    }

    try {
      const response = await api.delete(`/carritos/${carrito.cartId}/productos/${productoId}`);
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleActualizarCantidad = async (productoId, cantidad) => {
    if (!carrito.cartId) {
      console.error('No se puede actualizar la cantidad del producto. Carrito no encontrado.');
      return;
    }

    try {
      const response = await api.put(`/carritos/${carrito.cartId}/productos/${productoId}`, { cantidad });
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  if (!carrito) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.productos.map(producto => (
          <li key={producto.productoId}>
            {producto.nombreProducto} - {producto.cantidad} x {producto.precioUnitario}
            <button onClick={() => handleEliminarProducto(producto.productoId)}>Eliminar</button>
            <input
              type="number"
              value={producto.cantidad}
              onChange={(e) => handleActualizarCantidad(producto.productoId, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <div>
        <h3>Agregar Nuevo Producto</h3>
        <input
          type="text"
          placeholder="ID del Producto"
          value={nuevoProducto.productoId}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, productoId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={nuevoProducto.nombreProducto}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombreProducto: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevoProducto.cantidad}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Precio Unitario"
          value={nuevoProducto.precioUnitario}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precioUnitario: parseFloat(e.target.value) })}
        />
        <button onClick={handleAgregarProducto}>Agregar Producto</button>
      </div>
    </div>
  );
};

export default Cart;
