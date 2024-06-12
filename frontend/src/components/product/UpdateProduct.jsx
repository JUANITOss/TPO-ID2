import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
  });

  const navigate = useNavigate();

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
    setProductData({
      nombreProducto: product.nombreProducto,
      descripcion: product.descripcion,
      precio: product.precio,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/product/updateProduct/${selectedProduct.productId}`, productData);
      console.log('Producto actualizado:', response.data);
      navigate('/'); // Redirigir a la lista de productos después de actualizar
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
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
        <div>
          <h2>Actualizar Producto</h2>
          <form onSubmit={handleUpdateProduct}>
            <div>
              <label>Nombre del Producto:</label>
              <input
                type="text"
                name="nombreProducto"
                value={productData.nombreProducto}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Descripción:</label>
              <input
                type="text"
                name="descripcion"
                value={productData.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                value={productData.precio}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Actualizar Producto</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
