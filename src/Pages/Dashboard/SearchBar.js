import React from 'react';

const SearchBar = () => {
return (
    <div>
      <div className="mx-10 mt-10 bg-white py-3 rounded shadow-sm">
        <div className=" flex justify-between px-5 ">
          <div className=" flex items-center">
            <h2 className=" mr-28 text-lg font-bold">Billings</h2>
            <input
              className=" input input-bordered outline-none cursor-text "
              type="text"
              placeholder="Search Here"
            />
          </div>
          <label
            htmlFor="billing-modal"
            className=" btn bg-slate-800 rounded-lg cursor-pointer text-white"
          >
            Add New Bill
          </label>
        </div>
      </div>
     
    </div>
  );
};

export default SearchBar;
