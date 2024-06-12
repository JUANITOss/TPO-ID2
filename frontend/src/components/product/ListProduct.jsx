import React, { useState, useEffect } from 'react';
import api from '../../api';

const ListProduct = () => {
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

  const handleAddToCart = async (product, quantity) => {
    try {
      const payload = {
        _id: product._id,
        nombreProducto: product.nombreProducto,
        cantidad: quantity,
        precioUnitario: product.precio,
      };
      const response = await api.post('/product/productToCart', payload);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.nombreProducto}</h3>
          <p>Descripción: {product.descripcion}</p>
          <p>Precio: {product.precio}</p>
          <input
            type="number"
            min="1"
            value={product.quantity || 1}
            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
          />
          <button onClick={() => handleAddToCart(product, product.quantity || 1)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
