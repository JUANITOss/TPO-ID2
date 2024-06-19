import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const BillList = () => {
  const [bills, setBills] = useState([]);

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
 
  const handleDeleteBill = async (id) => {
    try {
      // Aquí asegúrate de pasar correctamente el ID
      await api.delete(`/bill/deleteBillId/${id}`);
      fetchBills(); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-neutral-800">
  <div className="flex items-center justify-between">
    <h1 className="text-white text-2xl font-bold">Bill</h1>
    <div className="flex items-center justify-self-end space-x-4">
      <Link to="/Main">
        <button 
          className="nav-link inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 bg-white text-black hover:bg-gray-700 hover:text-white">
          Home
        </button>
      </Link>
    </div>
  </div>

  <div className="overflow-auto h-screen bg-neutral-800">
    <div className="relative w-full overflow-auto">
    {bills.length === 0 ? (
  <p>No hay facturas disponibles.</p>
) : (
  <table className='w-full caption-bottom text-sm'>
    <thead className="[&amp;_tr]:border-b">
      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Bill ID</th>
        <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">User ID</th>
        <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Name</th>
        <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">DNI</th>
        <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Total</th>
        <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Date</th>
        <th className="text-white h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Action</th>
      </tr>
    </thead>
    <tbody>
      {bills.map((bill) => (
        <tr key={bill._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">{bill._id}</td>
          <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">{bill.userId}</td>
          <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">{bill.responsable}</td>
          <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">{bill.dni}</td>
          <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">${bill.total}</td>
          <td className="text-white p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">{bill.fechaFactura}</td>
          <td className="">
          <button
              className="inline-block p-5 text-white hover:bg-red-500 focus:relative"
              title="Delete Bill"
              onClick={() => handleDeleteBill(bill.orderId)}
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
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

    </div>
    </div>
    </div>
  );
};

export default BillList;
