import React, { useEffect, useState } from 'react';
import api from '../api';

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productos.map(producto => (
            <li key={producto.productId}>
              {producto.nombreProducto} - Precio: {producto.precio}
              <br />
              {producto.descripcion}
              <br />
              <img src={producto.fotos[0]} alt={producto.nombreProducto} width="100" />
              <br />
              {producto.videos.map(video => (
                <video key={video} width="200" controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
