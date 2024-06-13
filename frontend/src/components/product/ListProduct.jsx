import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

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

  return (
    <div class="flex flex-col gap-6 p-6 md:p-8 bg-neutral-800">
  <div class="flex items-center justify-between">
    <h1 class="text-white text-2xl font-bold">Products</h1>
     <div className="flex items-center justify-self-end space-x-4">
    <Link to="/info-cart">
      <button 
        className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
            View Cart
      </button>
    </Link>
    <Link to="/">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
            Logout
        </button>
    </Link>
   </div> 
  </div>
  <div class="overflow-auto h-screen bg-neutral-800">
    <div class="relative w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&amp;_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th class="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Name
            </th>
            <th class="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Description
            </th>
            <th class="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Price
            </th>
            <th class="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="[&amp;_tr:last-child]:border-0">
          {products.map((product) => (
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td class="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">{product.nombreProducto}</td>
              <td class="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{product.descripcion}</td>
              <td class="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${product.precio}</td>
              <td class="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div class="flex items-center gap-2">
                <button 
                    onClick={() => handleAddToCart(product, product.quantity || 1)}
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                          <circle cx="8" cy="21" r="1"></circle>
                          <circle cx="19" cy="21" r="1"></circle>
                          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                      </svg>
                      Add to Cart
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
  //   <div>
  //     <h1>Lista de Productos</h1>
  //     {products.map((product) => (
  //       <div key={product._id}>
  //         <h3>{product.nombreProducto}</h3>
  //         <p>Descripción: {product.descripcion}</p>
  //         <p>Precio: {product.precio}</p>
  //         <input
  //           type="number"
  //           min="1"
  //           value={product.quantity || 1}
  //           onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
  //         />
  //         <button onClick={() => handleAddToCart(product, product.quantity || 1)}>Agregar al carrito</button>
  //       </div>
  //     ))}
  //   </div>

  
};

export default ListProduct;
