import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const UpdateBillForm = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState('');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaFactura, setFechaFactura] = useState('');
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await api.get('/bill/getBills');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
    setOrderId(bill.orderId);
    setUserId(bill.userId);
    setProductos(bill.productos);
    setTotal(bill.total);
    setFechaFactura(bill.fechaFactura);
    setPagos(bill.pagos);
  };

  const handleUpdateBill = async (e) => {
    e.preventDefault();
    const updatedBill = {
      orderId,
      userId,
      productos,
      total,
      fechaFactura,
      pagos,
    };

    try {
      const response = await api.put(`/bill/updateBillById/${selectedBill.id}`, updatedBill);
      console.log('Bill updated:', response.data);
      // Aquí podrías manejar una redirección o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  return (
    <div class="flex flex-col gap-6 p-6 md:p-8 bg-neutral-800">
    <div class="flex items-center justify-between">
     <h1 class="text-white text-2xl font-bold">Update Products</h1>
      <div className="flex items-center justify-self-end space-x-4">
     <Link to="/Main">
       <button 
        className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
            Home
      </button>
    </Link>
    </div>
    </div>
    <div className="h-screen bg-neutral-800">
        <h2 className="text-white text-xl font-bold">Select Bill to Update</h2>
        <table className="w-full caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Order ID
              </th>
              <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Usuario ID
              </th>
              <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
          {bills.map((bill) => (
            <tr key={bill.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{bill.orderId}</td>
            <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{bill.userId}</td>
            <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
              <div className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                <button
                  className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Edit Bill"
                  onClick={() => handleSelectBill(bill)}
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
              </div>
            </td>
          </tr>
          ))}
          </tbody>
        </table>
        {selectedBill && (
          <div className="mt-6">
          <h2 className="text-white text-xl font-bold">Actualizar Producto</h2>
          <form onSubmit={handleUpdateBill} className="mt-4">
            <div className="mb-4">
              <label className="block text-white mb-2">Order ID:</label>
              <input
                type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">User ID:</label>
              <input
                type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
              Update Bill
            </button>
          </form>
        </div>
        )}
        </div>
      </div>
    );
  };


export default UpdateBillForm;
