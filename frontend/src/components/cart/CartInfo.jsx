import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';

const CartInfo = () => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    navigate('/create-order');
  };

  if (loading) return <div className="text-center text-lg font-semibold mt-4 text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg font-semibold mt-4">Failed to load cart</div>;

  // Calcular el precio total del carrito
  const totalPrice = carrito.reduce((total, producto) => {
    return total + (producto.precio * producto.cantidad);
  }, 0).toFixed(2);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 min-h-screen bg-neutral-800 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Add Products</h1>
        <div className="flex items-center space-x-4">
          <Link to="/list-product">
            <button 
              className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
              Continue Shopping
            </button>
          </Link>
          <Link to="/">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center flex-grow p-4">
        <div className="max-w-4xl w-full mx-auto p-4 bg-neutral-700 text-white rounded shadow-lg mt-8">
          {carrito.length === 0 ? (
            <div className="text-center text-gray-500">Empty Cart</div>
          ) : (
            <React.Fragment>
              <CartForm carrito={carrito} setCarrito={setCarrito} />
              <div className="flex justify-end mt-4">
                <div className="text-xl font-semibold">Total: ${totalPrice}</div>
              </div>
            </React.Fragment>
          )}
          <div className=''>
          
          <button 
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            onClick={handleConvertToOrder}>
              Create Order
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartForm = ({ carrito, setCarrito }) => {
  
  const [productos, setProductos] = useState(
    carrito.map(producto => ({
      ...producto,
      cantidadInput: producto.cantidad.toString(),
    }))
  );

  const handleIncrement = (index) => {
    const updatedProductos = [...productos];
    updatedProductos[index].cantidadInput = (parseInt(updatedProductos[index].cantidadInput, 10) + 1).toString();
    setProductos(updatedProductos);
  };

  const handleDecrement = (index) => {
    const updatedProductos = [...productos];
    updatedProductos[index].cantidadInput = Math.max(0, parseInt(updatedProductos[index].cantidadInput, 10) - 1).toString();
    setProductos(updatedProductos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productosToUpdate = productos.map(producto => ({
        _id: producto._id,
        cantidad: parseInt(producto.cantidadInput, 10)
      }));

      const response = await api.put('/cart/modifiyCart', { productos: productosToUpdate });
      setCarrito(response.data.carrito.productos);
      alert('Carrito modificado con éxito');
    } catch (error) {
      console.error('Error al modificar el carrito', error);
      alert('Hubo un error al modificar el carrito');
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-6">
        <ul className="grid gap-6">
          {productos.map((producto, index) => (
            <li key={producto.productoId} className="grid grid-cols-[1fr_100px] items-center gap-4">
              <div className="grid gap-1">
                <h3 className="font-semibold">{producto.nombreProducto}</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    onClick={() => handleDecrement(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <span>{producto.cantidadInput}</span>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    onClick={() => handleIncrement(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                  
                </div>
              </div>
              <span className="text-right font-semibold">{`$${producto.precio}`}</span>
              <span className="text-right font-semibold">{`Total de producto: $${producto.precio * producto.cantidadInput}`}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                title="Edit Cart"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
    </form>
    
  );
};

export default CartInfo;
