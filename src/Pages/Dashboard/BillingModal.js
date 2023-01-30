import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const BillingModal = ({ refetch }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const BillingData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      paidAmount: data.paidAmount,
    };

    fetch('http://localhost:5000/add-billing', {
      method: 'POST',
      body: JSON.stringify(BillingData),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId !== 0) {
          toast.success('Your Billing Data is Added');
          reset();
          refetch();
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="billing-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className=" text-xl font-bold text-slate-700 mb-4">
            Add New Bill
          </h1>
          <div>
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="input input-bordered"
                placeholder="Your Full Name"
                type="text"
                {...register('name', {
                  required: true,
                })}
              />
              {errors.name?.type === 'required' && (
                <span className="text-error">Name is required</span>
              )}

              <input
                className="input input-bordered"
                placeholder="Your Email"
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.name?.type === 'required' && (
                <span className="text-error">Email is required</span>
              )}

              <input
                placeholder="Your Phone Number"
                className="input input-bordered"
                type="number"
                {...register('phone', {
                  required: (
                    <span className=" text-error">Phone Input is Blank</span>
                  ),
                  minLength: {
                    value: 11,
                    message: 'Minimum Length 11',
                  },
                })}
              />
              {errors.phone && <span role="alert">{errors.phone.message}</span>}

              <input
                className="input input-bordered"
                placeholder="Your Payable Amount"
                type="number"
                {...register('paidAmount', {
                  required: true,
                })}
              />
              {errors.paidAmount?.type === 'required' && (
                <span className="text-error">Payable Amount is Required</span>
              )}
              <div className=" flex justify-between items-center">
                <div>
                  <input
                    className="btn btn-ghost bg-slate-800 text-white"
                    type="submit"
                    value="ADD Bill"
                  />
                </div>
                <div>
                  <div>
                    <label
                      htmlFor="billing-modal"
                      className="btn bg-orange-700 text-white btn-md btn-error"
                    >
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingModal;
