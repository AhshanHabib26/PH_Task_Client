import React from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';

const BillingTable = ({ inputSearchData, pageNum }) => {
  const { data, isLoading, refetch } = useQuery(['billing-list', pageNum], () =>
    fetch(`http://localhost:5000/billing-list?pageNum=${pageNum}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  const handleDeleteBilling = (id) => {
    fetch(`http://localhost:5000/delete-billing/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        refetch();
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="max-w-7xl mt-5 mx-auto">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Billing Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Paid Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.result?.map(
                (item, index) =>
                  (item.name.toLowerCase().includes(inputSearchData) ||
                    item.email.includes(inputSearchData) ||
                    item.phone.includes(inputSearchData)) && (
                    <>
                      <tr key={index}>
                        <th>{item._id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>${item.paidAmount}</td>
                        <td>
                          <Link to="/" className="btn  bg-slate-800 btn-sm">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBilling(item._id)}
                            className="btn  ml-3 bg-slate-800 btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingTable;
