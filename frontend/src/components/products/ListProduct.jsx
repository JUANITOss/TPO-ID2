import React, { useState, useEffect } from 'react';
import api from '../../api';

function ListProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product/getProduct');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.nombreProducto}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListProduct;
