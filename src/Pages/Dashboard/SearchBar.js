import React, { useEffect, useState } from 'react';
import BillingTable from './BillingTable';

const SearchBar = () => {

  const [totalPage, setTotalPage] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [inputSearchData, setInputSearchData] = useState("");


  useEffect(() => {
    fetch("http://localhost:5000/totalDataCount", {
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
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
      <div className="mx-10 mt-10 bg-white py-3 rounded shadow-sm">
        <div className=" flex justify-between px-5 ">
          <div className=" flex items-center">
            <h2 className=" mr-28 text-lg font-bold">Billings</h2>
            <input
              className=" input input-bordered outline-none cursor-text "
              type="text"
              placeholder="Search Here"
              onKeyUp={(event) => setInputSearchData(event.target.value.toLowerCase())}
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
     <BillingTable  inputSearchData={inputSearchData}
        pageNum={pageNum}/>
    </div>
  );
};

export default SearchBar;
