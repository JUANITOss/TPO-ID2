import React, { useEffect, useState } from 'react';
import api from '../api';

const Cart = ({ userId }) => {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchCarrito = async () => {
      const response = await api.get(`/carritos/${userId}`);
      setCarrito(response.data.items);
    };

    const fetchProductos = async () => {
      const response = await api.get('/productos');
      setProductos(response.data);
    };

    fetchCarrito();
    fetchProductos();
  }, [userId]);

  const agregarProducto = async () => {
    const producto = productos.find(p => p.productId === selectedProduct);
    const newItem = {
      productId: selectedProduct,
      nombreProducto: producto.nombreProducto,
      cantidad: parseInt(cantidad, 10),
      precio: producto.precio,
    };

    const updatedCarrito = [...carrito, newItem];
    setCarrito(updatedCarrito);

    await api.post(`/carritos/${userId}/items`, newItem);

    setSelectedProduct('');
    setCantidad(1);
  };

  const eliminarProducto = async (productId) => {
    const updatedCarrito = carrito.filter(item => item.productId !== productId);
    setCarrito(updatedCarrito);

    await api.delete(`/carritos/${userId}/items/${productId}`);
  };

  const cambiarCantidad = async (productId, newCantidad) => {
    const updatedCarrito = carrito.map(item => 
      item.productId === productId ? { ...item, cantidad: parseInt(newCantidad, 10) } : item
    );
    setCarrito(updatedCarrito);

    await api.put(`/carritos/${userId}/items/${productId}`, { cantidad: parseInt(newCantidad, 10) });
  };

  const convertirEnPedido = async () => {
    const response = await api.post(`/carritos/${userId}/convertir-en-pedido`);
    alert('Carrito convertido en pedido con éxito');
    setCarrito([]);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
        <option value="">Selecciona un producto</option>
        {productos.map(producto => (
          <option key={producto.productId} value={producto.productId}>
            {producto.nombreProducto}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={e => setCantidad(e.target.value)}
        placeholder="Cantidad"
      />
      <button onClick={agregarProducto}>Agregar</button>
      <ul>
        {carrito.map(item => (
          <li key={item.productId}>
            {item.nombreProducto} - Cantidad: 
            <input
              type="number"
              min="1"
              value={item.cantidad}
              onChange={e => cambiarCantidad(item.productId, e.target.value)}
            />
            <button onClick={() => eliminarProducto(item.productId)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={convertirEnPedido}>Convertir en Pedido</button>
    </div>
  );
};

export default Cart;
