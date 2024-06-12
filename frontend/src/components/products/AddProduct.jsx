import React, { useState } from 'react';
import api from '../../api';

function AddProduct() {
  const [product, setProduct] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: 0,
    operador: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/product/createProduct', product);
      console.log(response.data);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombreProducto" value={product.nombreProducto} onChange={handleChange} />
        <input type="text" name="descripcion" value={product.descripcion} onChange={handleChange} />
        <input type="number" name="precio" value={product.precio} onChange={handleChange} />
        <input type="text" name="operador" value={product.operador} onChange={handleChange} />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default AddProduct;
