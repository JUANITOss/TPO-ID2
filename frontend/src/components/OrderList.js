import React, { useEffect, useState } from 'react';
import api from '../api';

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get(`/pedidos/${userId}`);
      setOrders(response.data);
    };

    fetchOrders();
  }, [userId]);

  const facturarPedido = async (orderId) => {
    const response = await api.post(`/pedidos/${orderId}/factura`);
    alert('Pedido facturado con éxito');
    const updatedOrders = orders.map(order => order.orderId === orderId ? response.data : order);
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {orders.map(order => (
          <li key={order.orderId}>
            Pedido ID: {order.orderId} - Estado: {order.estado}
            <button onClick={() => facturarPedido(order.orderId)}>Facturar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
