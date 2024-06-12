import React, { useState, useEffect } from 'react';
import api from '../../api';

const CartInfo = () => {

  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('/cart/getCart');
        setCarrito(response.data.productos);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleConvertToOrder = () => {
    // Placeholder function for future implementation
    console.log('Convertir el carrito en una orden');
    alert('Esta funcionalidad estará disponible próximamente');
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el carrito</div>;

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div>No hay productos en el carrito</div>
      ) : (
        <CartForm carrito={carrito} setCarrito={setCarrito} />
      )}
      <button className="convert-to-order-btn" onClick={handleConvertToOrder}>
        Convertir a Orden
      </button>
    </div>
  );
};

const CartForm = ({ carrito, setCarrito }) => {
  const [productos, setProductos] = useState(carrito.map(producto => ({
    ...producto,
    cantidadInput: producto.cantidad.toString()  // Agregar campo cantidadInput para manejar el input de forma independiente
  })));

  const handleChange = (index, cantidad) => {
    // Crear una copia del array de productos para mantener inmutabilidad
    const updatedProductos = [...productos];
    // Actualizar solo el producto específico que está siendo modificado
    updatedProductos[index] = {
      ...updatedProductos[index],
      cantidadInput: cantidad  // Actualizar cantidadInput para reflejar el valor del input
    };
    setProductos(updatedProductos);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productosToUpdate = productos.map(producto => ({
        _id: producto._id,
        cantidad: parseInt(producto.cantidadInput, 10)
      }));
  
      console.log('Productos a actualizar:', productosToUpdate);  // Verifica en la consola del navegador
  
      const response = await api.put('/cart/modifiyCart', { productos: productosToUpdate });
  
      console.log('Respuesta del servidor:', response.data);  // Verifica la respuesta del servidor
  
      // Actualizar el carrito local en CartInfo después de la modificación
      setCarrito(response.data.carrito.productos);
  
      alert('Carrito modificado con éxito');
    } catch (error) {
      console.error('Error al modificar el carrito:', error);
      alert('Hubo un error al modificar el carrito');
    }
  };
    

  return (
    <form onSubmit={handleSubmit}>
      {productos.map((producto, index) => (
        <div key={producto.productoId} className="cart-item">
          <span>{producto.nombreProducto}</span>
          <input
            type="number"
            value={producto.cantidadInput}
            onChange={(e) => handleChange(index, e.target.value)}
            min="0"
          />
        </div>
      ))}
      <button type="submit">Modificar Carrito</button>
    </form>
  );
};

export default CartInfo;

