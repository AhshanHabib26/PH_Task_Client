import React from 'react';

const BillingPagination = ({ totalPage, setPageNum }) => {
  return (
    <div className=" flex justify-center mt-5">
      {[...Array(totalPage).keys()].map((num, index) => (
        <p
          onClick={() => setPageNum(num)}
          key={index}
          className=" bg-slate-800 text-white text-center h-7 w-7 mr-2 text-lg  rounded-full cursor-pointer"
        >
          {num + 1}
        </p>
      ))}
    </div>
  );
};

export default BillingPagination;
