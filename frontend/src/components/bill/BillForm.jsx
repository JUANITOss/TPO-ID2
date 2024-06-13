import React, { useState } from 'react';
import api from '../../api';

const BillForm = () => {
  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState('');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaFactura, setFechaFactura] = useState('');
  const [pagos, setPagos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      const response = await api.post('/bill/createBill', newBill);
      setMessage('Nueva factura creada exitosamente.');
      setError('');
      setOrderId('');
      setUserId('');
      setProductos([]);
      setTotal(0);
      setFechaFactura('');
      setPagos([]);
      console.log('New bill created:', response.data);
    } catch (error) {
      console.error('Error creating bill:', error);
      setMessage('');
      setError('Error al crear la factura.');
    }
  };

  return (
    <div className='bg-neutral-800 h-screen'>
      <h2>Crear Nueva Factura</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Order ID:
          <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
        </label>
        <label>
          Usuario ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </label>
        {/* <label>
          Productos:
          <input type="text" value={productos} onChange={(e) => setProductos(e.target.value)} required />
        </label> */}
        <label>
          Fecha Factura:
          <input type="text" value={fechaFactura} onChange={(e) => setFechaFactura(e.target.value)} required />
        </label>
        {/* Aquí añadir más campos según sea necesario para productos, total, fechaFactura, pagos */}
        <button type="submit">Crear Factura</button>
      </form>
    </div>
  );
};

export default BillForm;
