import React from 'react';
import BillingModal from './BillingModal';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Dashboard = () => {
  return (
    <div className=" bg-slate-800 h-screen">
      <Navbar />
      <SearchBar />
      <BillingModal />
    </div>
  );
};

export default Dashboard;
