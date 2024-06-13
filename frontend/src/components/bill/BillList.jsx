import React, { useState, useEffect } from 'react';
import api from '../../api';

const BillList = () => {
  const [bills, setBills] = useState([]);

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
 
  const handleDeleteBill = async (id) => {
    try {
      // Aquí asegúrate de pasar correctamente el ID
      await api.delete(`/bill/deleteBillId/${id}`);
      fetchBills(); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  return (
    <div>
      <h2>Listado de Facturas</h2>
      {bills.length === 0 ? (
        <p>No hay facturas disponibles.</p>
      ) : (
        <ul>
          {bills.map((bill) => (
            <li key={bill._id}>
              <p>OrderId: {bill.orderId}</p>
              <p>Usuario ID: {bill.userId}</p>
              <p>Total: {bill.total}</p>
              {/* Asegúrate de pasar el _id correcto al llamar handleDeleteBill */}
              <button onClick={() => handleDeleteBill(bill.orderId)}>Eliminar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BillList;
