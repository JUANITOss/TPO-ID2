import React, { useEffect, useState } from 'react';
import api from '../api';

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await api.get('/productos');
      setProductos(response.data);
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.productId}>
            {producto.nombreProducto} - Precio: {producto.precio}
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
    </div>
  );
};

export default ProductList;
