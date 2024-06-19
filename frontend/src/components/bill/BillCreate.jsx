import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-neutral-800">
    <div className="flex items-center justify-between">
     <h1 className="text-white text-2xl font-bold">Pay Bill</h1>
      <div className="flex items-center justify-self-end space-x-4">
     <Link to="/Main">
       <button 
        className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
            Home
      </button>
    </Link>
    </div>
    </div>
    <div className="overflow-auto h-screen bg-neutral-800">
      {orderId ? (
        <form onSubmit={handlePayment}>
    <div className="mb-4">
        <label className="block text-white mb-2">Payment Method:</label>
        <select 
          type="text" 
          name=""
          placeholder=" "
          value={method} 
          onChange={handleMethodChange} 
          className='w-full px-3 py-2 border border-gray-300 rounded-md'>
              <option value="MercadoPago">MercadoPago</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Pago en el local">Pago en el local</option>
          </select>

          <button type="submit"
                  className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white'>
         </button>

      </div>

        

         </form>
      ) : (
        <p>No se ha recibido una Order ID</p>
      )}
    </div>
    </div>
    
  );
};

export default BillCreate;
