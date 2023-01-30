import React, { useEffect, useState } from 'react';
import BillingPagination from './BillingPagination';
import BillingTable from './BillingTable';

const SearchBar = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [inputSearchData, setInputSearchData] = useState('');

  useEffect(() => {
    fetch('https://ph-task-server.vercel.app/totalDataCount', {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const totalData = data.count;
        const pages = Math.ceil(totalData / 10);
        setTotalPage(pages);
      });
  }, []);

  return (
    <div>
      <div className="mx-10 mt-10  bg-slate-800 py-3 rounded shadow-sm">
        <div className=" flex justify-between px-5 ">
          <div className=" flex items-center">
            <h2 className=" mr-28 text-white text-lg font-bold">Billings</h2>
            <input
              className=" input input-bordered outline-none cursor-text "
              type="text"
              placeholder="Search Here"
              onKeyUp={(event) =>
                setInputSearchData(event.target.value.toLowerCase())
              }
            />
          </div>
          <label
            htmlFor="billing-modal"
            className=" btn bg-orange-600 rounded-lg cursor-pointer text-white"
          >
            Add New Bill
          </label>
        </div>
        
      </div>
      <BillingTable inputSearchData={inputSearchData} pageNum={pageNum} />
      <BillingPagination totalPage={totalPage} setPageNum={setPageNum} />
    </div>
  );
};

export default SearchBar;
