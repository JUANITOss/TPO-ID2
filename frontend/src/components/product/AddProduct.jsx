import React, { useState } from 'react';
import api from '../../api';
import '../estilosCSS/addProductCSS.css';
import { Link } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
    operador: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/product/addProduct', product);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  return (
<div class="flex flex-col gap-6 p-6 md:p-8 bg-neutral-800">
    <div class="flex items-center justify-between">
     <h1 class="text-white text-2xl font-bold">Add Products</h1>
      <div className="flex items-center justify-self-end space-x-4">
     <Link to="/Main">
       <button 
        className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
            Home
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
      <form onSubmit={handleSubmit} className='mt-4'>
        
        <div className="mb-4">
        <label className="block text-white mb-2">Product Name:</label>
        <input 
          type="text" 
          name="nombreProducto" 
          value={product.nombreProducto} 
          onChange={handleChange} 
          className='w-full px-3 py-2 border border-gray-300 rounded-md'/>
         </div>

         <div className="mb-4">
        <label className="block text-white mb-2">Description:</label>
        <input 
          type="text" 
          name="descripcion" 
          id='descripcion'
          value={product.descripcion} 
          onChange={handleChange} 
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
         </div>

         <div className="mb-4">
        <label className="block text-white mb-2">Price:</label>
        <input 
          type="number" 
          name="precio" 
          value={product.precio} 
          onChange={handleChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
         </div>

         <div className="mb-4">
        <label className="block text-white mb-2">Operator:</label>
        <select 
          type="text" 
          name="operador"
          placeHolder=" "
          value={product.operador} 
          onChange={handleChange} 
          className='w-full px-3 py-2 border border-gray-300 rounded-md'>

              <option>Luis</option>
              <option>Tomas</option>
              <option>Juan</option>
            
          </select>
         </div>
         <button type="submit"
                  className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white'
                    onChange={handleSubmit}>
          Create Product   
         </button>
       </form>
    </div>
  </div>
  );


}

export default AddProduct;
