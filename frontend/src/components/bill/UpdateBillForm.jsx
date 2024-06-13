import React, { useState, useEffect } from 'react';
import api from '../../api';

const UpdateBillForm = ({ billId }) => {
  const [bill, setBill] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState('');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaFactura, setFechaFactura] = useState('');
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    if (billId) {
      fetchBill();
    }
  }, [billId]);

  const fetchBill = async () => {
    try {
      const response = await api.get(`/bill/getBillById/${billId}`);
      if (response.data) {
        setBill(response.data);
        setOrderId(response.data.orderId);
        setUserId(response.data.userId);
        setProductos(response.data.productos);
        setTotal(response.data.total);
        setFechaFactura(response.data.fechaFactura);
        setPagos(response.data.pagos);
      } else {
        setBill(null);
      }
    } catch (error) {
      console.error('Error fetching bill:', error);
      setBill(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBill = {
      orderId,
      userId,
      productos,
      total,
      fechaFactura,
      pagos,
    };

    try {
      const response = await api.put(`/bill/updateBillById/${billId}`, updatedBill);
      console.log('Bill updated:', response.data);
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  if (bill === null) {
    return <div>No se encontró la factura.</div>;
  }

  if (!bill) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Actualizar Factura</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Order ID:
          <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
        </label>
        <label>
          Usuario ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </label>
        {/* Aquí añadir más campos según sea necesario para productos, total, fechaFactura, pagos */}
        <button type="submit">Actualizar Factura</button>
      </form>
    </div>
  );
};

export default UpdateBillForm;
