import React, { useState, useEffect } from 'react';
import api from '../../api';

const UpdateBillForm = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState('');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaFactura, setFechaFactura] = useState('');
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await api.get('/bill/getBills');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
    setOrderId(bill.orderId);
    setUserId(bill.userId);
    setProductos(bill.productos);
    setTotal(bill.total);
    setFechaFactura(bill.fechaFactura);
    setPagos(bill.pagos);
  };

  const handleUpdateBill = async (e) => {
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
      const response = await api.put(`/bill/updateBillById/${selectedBill.id}`, updatedBill);
      console.log('Bill updated:', response.data);
      // Aquí podrías manejar una redirección o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  return (
    <div>
      <h2>Actualizar Factura</h2>
      <div>
        <h3>Selecciona una factura para actualizar:</h3>
        <ul>
          {bills.map((bill) => (
            <li key={bill.id}>
              <button onClick={() => handleSelectBill(bill)}>
                Factura ID: {bill.id}, Order ID: {bill.orderId}, Usuario ID: {bill.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedBill && (
        <div>
          <h3>Datos de la factura seleccionada:</h3>
          <p>Order ID: {selectedBill.orderId}</p>
          <p>Usuario ID: {selectedBill.userId}</p>
          {/* Mostrar más campos según sea necesario para productos, total, fechaFactura, pagos */}
          <form onSubmit={handleUpdateBill}>
            <label>
              Order ID:
              <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
            </label>
            <label>
              Usuario ID:
              <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </label>
            {/* Añadir más campos según sea necesario para productos, total, fechaFactura, pagos */}
            <button type="submit">Actualizar Factura</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateBillForm;
