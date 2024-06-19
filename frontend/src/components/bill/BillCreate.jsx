import api from '../../api';
import React from 'react';
import { useLocation } from 'react-router-dom';

const CreateBill = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div>
      <h2>Crear Factura</h2>
      {orderId ? (
        <p>Order ID: {orderId}</p>
      ) : (
        <p>No se ha recibido una Order ID</p>
      )}
      {/* Aquí iría el formulario o los detalles para crear la factura */}
    </div>
  );
};

export default CreateBill;
