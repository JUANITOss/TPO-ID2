import React, { useState, useEffect } from 'react';
import api from '../../api'; // Asegúrate de que esta ruta es correcta

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las órdenes: {error.message}</div>;

  return (
    <div className="order-container">
      <h2>Mis Órdenes</h2>
      {orders.length === 0 ? (
        <div>No tienes órdenes</div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-item">
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
        ))
      )}
    </div>
  );
};

export default OrderList;
