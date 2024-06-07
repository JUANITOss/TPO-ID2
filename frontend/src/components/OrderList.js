import React, { useEffect, useState } from 'react';
import api from '../api';

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/pedidos/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  const facturarPedido = async (orderId) => {
    try {
      const response = await api.post(`/pedidos/${orderId}/factura`);
      alert('Pedido facturado con éxito');
      const updatedOrders = orders.map(order => order.orderId === orderId ? response.data : order);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error facturando pedido:', error);
    }
  };

  return (
    <div>
      <h2>Pedidos</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos por realizar.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.orderId}>
              Pedido ID: {order.orderId} - Estado: {order.estado}
              <button onClick={() => facturarPedido(order.orderId)}>Facturar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
