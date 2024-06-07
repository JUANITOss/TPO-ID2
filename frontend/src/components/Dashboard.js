import React from 'react';
import { Link } from 'react-router-dom';
import SessionTime from './SessionTime';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <SessionTime />
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Dashboard;
