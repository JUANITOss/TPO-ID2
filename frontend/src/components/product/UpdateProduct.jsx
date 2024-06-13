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
      const response = await api.put(`/product/updateProduct/${selectedProduct._id}`, productData);
      console.log('Producto actualizado:', response.data);
      navigate('/main'); // Redirigir a la lista de productos después de actualizar
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/product/deleteProduct/${productId}`);
      console.log('Producto eliminado con éxito');
    } catch (error) {
      if (error.response) {
        // La solicitud fue realizada y el servidor respondió con un código de estado que no está en el rango de 2xx
        console.error('Error al eliminar el producto:', error.response.data.message);
        navigate('/main'); // Redirigir a la lista de productos después de actualizar
        
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error('No se recibió respuesta al eliminar el producto:', error.request);
      } else {
        // Ocurrió un error al configurar la solicitud
        console.error('Error al configurar la solicitud al eliminar el producto:', error.message);
      }
    }
  };
  

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-neutral-800">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Products</h1>
      </div>

      <div className="h-screen bg-neutral-800">
        <h2 className="text-white text-xl font-bold">Selecciona un Producto para Actualizar</h2>
        <table className="w-full caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Name
              </th>
              <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Description
              </th>
              <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Price
              </th>
              <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="[&amp;_tr:last-child]:border-0">
            {products.map((product) => (
              <tr key={product._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">{product.nombreProducto}</td>
                <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{product.descripcion}</td>
                <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${product.precio}</td>
                <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                    <button
                      className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                      title="Edit Product"
                      onClick={() => handleSelectProduct(product)}
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
                    <button
                      className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                      title="Delete Product"
                      onClick={() => handleDeleteProduct(product._id)}
                    
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
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedProduct && (
          <div className="mt-6">
            <h2 className="text-white text-xl font-bold">Actualizar Producto</h2>
            <form onSubmit={handleUpdateProduct} className="mt-4">
              <div className="mb-4">
                <label className="block text-white mb-2">Nombre del Producto:</label>
                <input
                  type="text"
                  name="nombreProducto"
                  value={productData.nombreProducto}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Descripción:</label>
                <input
                  type="text"
                  name="descripcion"
                  value={productData.descripcion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Precio:</label>
                <input
                  type="number"
                  name="precio"
                  value={productData.precio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
                Actualizar Producto
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
