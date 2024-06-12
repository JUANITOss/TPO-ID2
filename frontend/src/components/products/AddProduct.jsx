import React, { useState } from 'react';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
    operador: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      console.log('Producto creado:', data);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div>
    <h2>Agregar un Producto</h2>  
    <form onSubmit={handleSubmit}>
      <input name="nombreProducto" placeholder="Nombre del Producto" onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <input name="precio" placeholder="Precio" onChange={handleChange} />
      <input name="operador" placeholder="Operador" onChange={handleChange} />
      <button type="submit">Crear Producto</button>
    </form>
    </div>
  );
};

export default CreateProduct;
