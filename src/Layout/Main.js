import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from './Home';

const Main = () => {
  return (
    <div>
      <Home />
      <Outlet />
    </div>
  );
};

export default Main;
