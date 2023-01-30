import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ data, refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';
  
  const handlaeLogout = () => {
    localStorage.removeItem('accessToken');
    navigate(from, { replace: true });
  };

  return (
    <div className=" flex justify-between px-8 py-2 shadow-md  items-center ">
      <Link
        to="/billing-dashboard"
        className=" text-slate-800 font-bold text-lg"
      >
        Power Hack
      </Link>
      <h2 className=" text-slate-800 font-bold text-lg">Paid Total: {data}</h2>
      <button onClick={() => handlaeLogout()} className="btn cursor-pointer">
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
