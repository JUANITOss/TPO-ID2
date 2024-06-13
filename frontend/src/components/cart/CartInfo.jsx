import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const CartInfo = () => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('/cart/getCart'); // Ajusta la URL según tu configuración
        setCarrito(response.data.productos);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleConvertToOrder = () => {
   
    navigate('/create-order')

  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el carrito</div>;

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div>No hay productos en el carrito</div>
      ) : (
        <CartForm carrito={carrito} setCarrito={setCarrito} />
      )}
      <button className="convert-to-order-btn" onClick={handleConvertToOrder}>
        Convertir a Orden
      </button>
    </div>
  );
};

const CartForm = ({ carrito, setCarrito }) => {
  const [productos, setProductos] = useState(carrito);

  const handleChange = (productoId, cantidad) => {
    setProductos(productos.map(producto =>
      producto.productoId === productoId
        ? { ...producto, cantidad: parseInt(cantidad, 10) }
        : producto
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/cart/modifiyCart', { productos });
      setCarrito(response.data.carrito.productos);
      alert('Carrito modificado con éxito');
    } catch (error) {
      console.error('Error al modificar el carrito', error);
      alert('Hubo un error al modificar el carrito');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {productos.map(producto => (
        <div key={producto.productoId} className="cart-item">
          <span>{producto.nombreProducto}</span>
          <input
            type="number"
            value={producto.cantidad}
            onChange={(e) => handleChange(producto.productoId, e.target.value)}
            min="0"
          />
        </div>
      ))}
      <button type="submit">Modificar Carrito</button>
    </form>
  );
};

export default CartInfo;
