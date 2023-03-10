import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import Spinner from '../../Components/Spinner/Spinner';
import BillingModel from './BillingModel';

const BillingTable = ({
  billModal,
  setBillModal,
  inputSearchData,
  pageNum,
}) => {
  const [updateData, setUpdateData] = useState({});

  const { data, isLoading, refetch } = useQuery(['billing-list', pageNum], () =>
    fetch(`https://ph-task-server.vercel.app/billing-list?pageNum=${pageNum}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  const handleDeleteBilling = (id) => {
    fetch(`https://ph-task-server.vercel.app/delete-billing/${id}`, {
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
      {billModal && (
        <BillingModel
          setUpdateData={setUpdateData}
          updateData={updateData}
          refetch={refetch}
          setBillModal={setBillModal}
        />
      )}

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
                          <button
                            onClick={() => {
                              setUpdateData(item);
                              setBillModal(true);
                            }}
                            className="btn  bg-slate-800 btn-sm"
                          >
                            Edit
                          </button>
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
