import React, { useState, useEffect } from 'react';
import api from '../../api';


const OrderCreate = () => {
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [apellidoResponsable, setApellidoResponsable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvertToOrder = async () => {
    setLoading(true);
    try {
      console.log('Enviando solicitud al servidor...');
      const response = await api.post('/order/cartToOrder', {
        nombreResponsable: nombreResponsable,
        apellidoResponsable: apellidoResponsable,
      });
      setLoading(false);
      alert('Carrito convertido a orden con éxito');
      console.log('Respuesta del servidor:', response.data); 
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error('Error al convertir el carrito en orden:', error);    
    }
  };
  

  return (
    <div className="order-create-container">
      <h2>Crear Orden</h2>
      <form>
        <div className="form-group">
          <label htmlFor="nombreResponsable">Nombre Responsable:</label>
          <input
            type="text"
            id="nombreResponsable"
            value={nombreResponsable}
            onChange={(e) => setNombreResponsable(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidoResponsable">Apellido Responsable:</label>
          <input
            type="text"
            id="apellidoResponsable"
            value={apellidoResponsable}
            onChange={(e) => setApellidoResponsable(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleConvertToOrder} disabled={loading}>
          Convertir Carrito a Orden
        </button>
      </form>
      {loading && <p>Convirtiendo carrito a orden...</p>}
      {error && <p>Error al convertir el carrito en orden</p>}
    </div>
  );
};

export default OrderCreate;
