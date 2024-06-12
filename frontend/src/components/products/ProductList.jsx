import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (e, productId) => {
    setQuantities({ ...quantities, [productId]: parseInt(e.target.value) });
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product._id] || 1;
    try {
      const response = await fetch('/product/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productoId: product._id,
          nombreProducto: product.nombreProducto,
          cantidad: quantity,
          precioUnitario: product.precio
        })
      });
      const data = await response.json();
      console.log('Productos agregados al carrito:', data);
    } catch (error) {
      console.error('Error al agregar productos al carrito:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.nombreProducto} - ${product.precio}
            <input 
              type="number" 
              min="1" 
              value={quantities[product._id] || 1} 
              onChange={(e) => handleQuantityChange(e, product._id)} 
            />
            <button onClick={() => handleAddToCart(product)}>Agregar al Carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
