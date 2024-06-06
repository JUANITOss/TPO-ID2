import React, { useState } from 'react';
import api from '../api';

const AddProduct = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [fotos, setFotos] = useState('');
  const [videos, setVideos] = useState('');
  const [operador, setOperador] = useState('');

  const agregarProducto = async () => {
    const nuevoProducto = {
      productId: `prod-${Date.now()}`,
      nombreProducto,
      descripcion,
      fotos: fotos.split(','),
      videos: videos.split(','),
      precio: parseFloat(precio),
      historialPrecios: []
    };

    await api.post('/productos', nuevoProducto);
    setNombreProducto('');
    setDescripcion('');
    setPrecio('');
    setFotos('');
    setVideos('');
    setOperador('');
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <input type="text" placeholder="Nombre del Producto" value={nombreProducto} onChange={e => setNombreProducto(e.target.value)} />
      <input type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <input type="text" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
      <input type="text" placeholder="Fotos (separadas por coma)" value={fotos} onChange={e => setFotos(e.target.value)} />
      <input type="text" placeholder="Videos (separados por coma)" value={videos} onChange={e => setVideos(e.target.value)} />
      <input type="text" placeholder="Operador" value={operador} onChange={e => setOperador(e.target.value)} />
      <button onClick={agregarProducto}>Agregar</button>
    </div>
  );
};

export default AddProduct;
