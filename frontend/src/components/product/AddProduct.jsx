import React, { useState } from 'react';
import api from '../../api';
import '../estilosCSS/addProductCSS.css';

function AddProduct() {
  const [product, setProduct] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
    operador: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/product/addProduct', product);
      console.log(response.data);
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
    <div className="add-product-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombreProducto" placeholder="Nombre del Producto" value={product.nombreProducto} onChange={handleChange} />
        <input type="text" name="descripcion" placeholder="Descripción" value={product.descripcion} onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" value={product.precio} onChange={handleChange} />
        <input type="text" name="operador" placeholder="Operador" value={product.operador} onChange={handleChange} />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default AddProduct;
