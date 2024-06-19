import React, { useState, useEffect } from 'react';
import api from '../../api';
import {useNavigate} from 'react-router-dom';

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
  <div style={{ backgroundColor: '#333333', padding: '20px', borderRadius: '8px', color: 'white' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Crear Orden</h1>
    {cart ? (
      <div style={{ backgroundColor: '#444444', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginBottom: '10px', color: 'white' }}>Carrito Actual</h2>
        <div className="mb-4">
          <label className="block text-white mb-2">Nombre:</label>
          <input 
            type="text" 
            name="nombreResponsable" 
            value={current.nombreResponsable} 
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            style={{ backgroundColor: '#555555', color: 'white' }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Apellido:</label>
          <input 
            type="text" 
            name="apellidoResponsable" 
            value={current.apellidoResponsable} 
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            style={{ backgroundColor: '#555555', color: 'white' }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">DNI:</label>
          <input 
            type="text" 
            name="dniResponsable" 
            value={current.dniResponsable} 
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            style={{ backgroundColor: '#555555', color: 'white' }}
          />
        </div>
        <button 
          onClick={handleSubmit} 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Convertir Carrito a Orden
        </button>
      </div>
    ) : (
      <p style={{ textAlign: 'center' }}>Cargando carrito...</p>
    )}
    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
{order && (
  <div style={{ backgroundColor: '#444444', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', color: 'white' }}>
    <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>Orden Creada</h2>
    <div style={{ overflowX: 'auto' }}>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        <p><strong>User ID:</strong> {order.userId}</p>
        <p><strong>Nombre Responsable:</strong> {order.nombreResponsable}</p>
        <p><strong>Apellido Responsable:</strong> {order.apellidoResponsable}</p>
        <p><strong>DNI Responsable:</strong> {order.dniResponsable}</p>
        <p><strong>Recargo (IVA):</strong> {order.recargo}%</p>
        <hr />
        <p><strong>Productos:</strong></p>
        {order.productos.map((producto, index) => (
          <div key={index}>
            <p><strong>Nombre Producto:</strong> {producto.nombreProducto}</p>
            <p><strong>Total:</strong> {producto.total}</p>
            <p><strong>Descuento:</strong> {producto.descuento}</p>
            <p><strong>Impuesto:</strong> {producto.impuesto}</p>
            <hr /> {/* Separador entre productos */}
          </div>
        ))}
        <p><strong>Fecha Pedido:</strong> {order.fechaPedido}</p>
        <p><strong>Estado:</strong> {order.estado}</p>
      </pre>
    </div>
  </div>
)}
</div>

)};

export default OrderCreate;
