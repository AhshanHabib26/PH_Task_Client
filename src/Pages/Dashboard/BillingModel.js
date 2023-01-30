import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Styles from '../../Styles/BillingModel.module.css';

const BillingModel = ({ setBillModal, refetch, updateData, setUpdateData }) => {
  const [name, setName] = useState(updateData?.name || '');
  const [email, setEmail] = useState(updateData?.email || '');
  const [phone, setPhone] = useState(updateData?.phone || '');
  const [err, setErr] = useState(false);
  const [paidAmount, setPaidAmount] = useState(updateData?.paidAmount || '');
  const [loading, setLoading] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    if (phone.length !== 11) {
      return setErr(true);
    }
    setLoading(true);
    if (e.target?.add?.innerHTML === 'Add') {
      const data = { name, email, phone, paidAmount };
      fetch(`https://ph-task-server.vercel.app/add-billing`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged === true) {
            e.target.reset();
            setBillModal(false);
            refetch();
          } else {
            toast.success(data.message);
          }
          setLoading(false);
        });
    } else if (e.target?.update?.innerHTML === 'Update') {
      const data = { name, email, phone, paidAmount };

      fetch(
        `https://ph-task-server.vercel.app/update-billing/${updateData._id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            e.target.reset();
            setBillModal(false);
            refetch();
            toast.success(data.message);
          }
          setLoading(false);
        });
    }
  };

  return (
    <div className={Styles.BillingContainer}>
      <div className={Styles.BillingWrapper}>
        <div className=" relative bg-slate-800 w-[480px]  mx-auto rounded-md">
          <p
            className=" absolute top-2 right-4 font-semibold text-orange-600  bg-white text-center h-6 w-6 rounded-full cursor-pointer "
            onClick={() => {
              setBillModal(false);
              setUpdateData({});
            }}
          >
            X
          </p>
          {updateData?._id ? (
            <h2 className=" text-xl font-bold text-white p-4">Update Bill</h2>
          ) : (
            <h2 className=" text-xl font-bold text-white p-4">Add New Bill</h2>
          )}

          <form onSubmit={handleForm} className="p-4">
            <input
              type="text"
              name="name"
              placeholder=" Full Name"
              defaultValue={updateData?.name || ''}
              onChange={(e) => setName(e.target.value)}
              className=" input input-bordered input-md w-full max-w-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              defaultValue={updateData?.email || ''}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-md w-full max-w-lg my-3"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone Number"
              defaultValue={updateData?.phone || ''}
              onChange={(e) => setPhone(e.target.value)}
              className=" input input-bordered input-md w-full max-w-lg"
              required
            />
            <input
              type="number"
              name="billAmount"
              placeholder=" Payable Amount "
              defaultValue={updateData?.bill || ''}
              onChange={(e) => setPaidAmount(e.target.value)}
              className=" input text-[16px] input-bordered input-md w-full max-w-lg my-3"
              required
            />
            {err && (
              <span className=" text-sm text-left block text-orange-50">
                {'Phone number must be 11 characters'}
              </span>
            )}
            {updateData?._id ? (
              <button
                name="update"
                className=" btn bg-orange-600 hover:bg-green-600 w-full max-w-lg"
              >
                {loading ? 'Updating Your Data...' : 'Update'}
              </button>
            ) : (
              <button
                name="add"
                className=" btn bg-green-600 hover:bg-orange-600 w-full max-w-lg"
              >
                {loading ? 'Adding Your Data...' : 'Add'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingModel;
