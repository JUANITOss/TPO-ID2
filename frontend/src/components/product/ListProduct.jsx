import React, { useState, useEffect } from 'react';
import api from '../../api';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = async (product) => {
    try {
      console.log(product);
      const payload = {
        _id: product._id,
        nombreProducto: product.nombreProducto,
        cantidad: quantity,
        precioUnitario: product.precio,
      };
      console.log('Payload enviado:', payload);
      const response = await api.post('/product/productToCart', payload);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
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
