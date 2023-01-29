import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';


const Dashboard = () => {
  return (
    <div className=" bg-slate-800 h-screen">
      <Navbar />
      <SearchBar />
    </div>
  );
};

export default Dashboard;
