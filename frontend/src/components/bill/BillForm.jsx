import React, { useState } from 'react';
import axios from 'axios';

const BillForm = () => {
  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState('');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaFactura, setFechaFactura] = useState('');
  const [pagos, setPagos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBill = {
      orderId,
      userId,
      productos,
      total,
      fechaFactura,
      pagos,
    };

    try {
      const response = await axios.post('/api/bills', newBill);
      console.log('New bill created:', response.data);
      // Limpiar el formulario después de la creación exitosa
      setOrderId('');
      setUserId('');
      setProductos([]);
      setTotal(0);
      setFechaFactura('');
      setPagos([]);
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  return (
    <div>
      <h2>Crear Nueva Factura</h2>
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
        <button type="submit">Crear Factura</button>
      </form>
    </div>
  );
};

export default BillForm;
