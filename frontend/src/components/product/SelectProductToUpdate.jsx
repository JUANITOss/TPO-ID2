import React, { useState, useEffect } from 'react';
import UpdateProduct from './UpdateProduct';
import api from '../../api';

const SelectProductToUpdate = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h2>Selecciona un Producto para Actualizar</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId} onClick={() => handleSelectProduct(product)}>
            {product.nombreProducto}
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <UpdateProduct product={selectedProduct} />
      )}
    </div>
  );
};

export default SelectProductToUpdate;
