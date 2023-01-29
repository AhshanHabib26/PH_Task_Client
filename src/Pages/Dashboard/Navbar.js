import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ data }) => {
  const { totalAmount } = data;

  return (
    <div className=" flex justify-between px-8 py-4 shadow-md  items-center ">
      <Link
        to="/billing-dashboard"
        className=" text-slate-800 font-bold text-lg"
      >
        Power Hack
      </Link>
      <h2 className=" text-slate-800 font-bold text-lg">
        Paid Total: {totalAmount}
      </h2>
    </div>
  );
};

export default Navbar;
