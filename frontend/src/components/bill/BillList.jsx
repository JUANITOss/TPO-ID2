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
