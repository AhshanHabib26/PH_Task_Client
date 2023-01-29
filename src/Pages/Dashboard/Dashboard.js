import React from 'react';
import BillingModal from './BillingModal';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <BillingModal />
    </div>
  );
};

export default Dashboard;
