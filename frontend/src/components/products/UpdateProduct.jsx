// src/components/products/UpdateProduct.jsx
import React, { useState, useEffect } from 'react';

const UpdateProduct = ({ match }) => {
  const [product, setProduct] = useState({
    nombreProducto: '',
    descripcion: '',
    fotos: [],
    videos: [],
    precio: '',
    operador: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = match.params.productId;
        const response = await fetch(`/product/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [match.params.productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productId = match.params.productId;
      const response = await fetch(`/product/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      console.log('Producto actualizado:', data);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <div>
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreProducto" placeholder="Nombre del Producto" value={product.nombreProducto} onChange={handleChange} />
        <input name="descripcion" placeholder="Descripción" value={product.descripcion} onChange={handleChange} />
        <input name="fotos" placeholder="Fotos (URL)" value={product.fotos} onChange={handleChange} />
        <input name="videos" placeholder="Videos (URL)" value={product.videos} onChange={handleChange} />
        <input name="precio" placeholder="Precio" value={product.precio} onChange={handleChange} />
        <input name="operador" placeholder="Operador" value={product.operador} onChange={handleChange} />
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
