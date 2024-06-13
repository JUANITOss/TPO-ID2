import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillList = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get('/api/bills/getBills');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      await axios.delete(`/api/bills/deleteBillId/${id}`);
      // Actualizar la lista de facturas después de eliminar
      fetchBills();
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  return (
    <div>
      <h2>Listado de Facturas</h2>
      <ul>
        {bills.map((bill) => (
          <li key={bill._id}>
            <p>OrderId: {bill.orderId}</p>
            <p>Usuario ID: {bill.userId}</p>
            <p>Total: {bill.total}</p>
            <button onClick={() => handleDeleteBill(bill._id)}>Eliminar</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillList;
