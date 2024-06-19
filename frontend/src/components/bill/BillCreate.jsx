import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../api'; // Importa tu archivo donde tienes configurado Axios

const BillCreate = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  console.log("Order ID recibido:", orderId); 

  const [method, setMethod] = useState(''); // Estado para almacenar el método de pago seleccionado

  const handlePayment = async (event) => {
    event.preventDefault();
    console.log("Enviando request con orderId:", orderId);

    try {
      // Realizar la llamada al backend con Axios
      await api.post('/bill/createBill', { orderId, method });
      
      alert('Factura creada exitosamente!');
      // Redirigir a una página de confirmación
    } catch (error) {
      alert(`Error al crear la factura: ${error.message}`);
    }
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  return (
    <div>
      <h2>Pagar Factura</h2>
      {orderId ? (
        <form onSubmit={handlePayment}>
          <label>
            Método de Pago:
            <select value={method} onChange={handleMethodChange}>
              <option value="">Selecciona un método de pago</option>
              <option value="MercadoPago">MercadoPago</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Pago en el local">Pago en el local</option>
            </select>
          </label>
          <button type="submit">Proceder a pago</button>
        </form>
      ) : (
        <p>No se ha recibido una Order ID</p>
      )}
    </div>
  );
};

export default BillCreate;
