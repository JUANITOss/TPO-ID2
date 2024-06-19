import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/getOrders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePayment = (orderId) => {
    navigate('/create-bill', { state: { orderId } });
  };

  const handleDelete = async (orderId) => {
    try {
      await api.delete(`/order/deleteOrder/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      alert(`Orden ${orderId} eliminada!`);
    } catch (err) {
      alert(`Error al eliminar la orden: ${err.message}`);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las órdenes: {error.message}</div>;

  return (
    <div className="order-container">
      <h2>Mis Órdenes</h2>
      {orders.length === 0 ? (
        <div>No tienes órdenes</div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>Orden ID: {order._id}</h3>
              <p>Nombre del responsable: {order.nombreResponsable}</p>
              <p>Apellido del responsable: {order.apellidoResponsable}</p>
              <p>Fecha del pedido: {order.fechaPedido}</p>
              <p>Estado: {order.estado}</p>
              <h4>Productos:</h4>
              <ul>
                {order.productos.map((producto, index) => (
                  <li key={index}>
                    {producto.nombreProducto} - Total: {producto.total} - Descuento: {producto.descuento} - Impuesto: {producto.impuesto}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={() => handlePayment(order._id)}>Pagar</button>
              <button onClick={() => handleDelete(order._id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
