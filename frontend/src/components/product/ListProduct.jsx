import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product/getProduct');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (product) => {
    try {
      const response = await api.post('/product/addProductCart', {
        productoId: product.productId,
        nombreProducto: product.nombreProducto,
        cantidad: quantity,
        precioUnitario: product.precio
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      {products.map((product) => (
        <div key={product.productId}>
          <h3>{product.nombreProducto}</h3>
          <p>Descripción: {product.descripcion}</p>
          <p>Precio: {product.precio}</p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
};

export default ProductComponent;
