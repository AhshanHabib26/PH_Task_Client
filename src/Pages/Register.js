import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../Components/Spinner/Spinner';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const inputData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    fetch("https://ph-task-server.vercel.app/registration", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          localStorage.setItem('accessToken', data.token);
          navigate('/login');
          reset();
        } else {
          toast.error(data.error);
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <div className="px-5 lg:px-0 flex items-center bg-slate-800 min-h-screen">
          {loading && <Spinner />}
          <div className="card mx-auto w-[380px] md:w-[420px] lg:w-[480px] bg-base-100 border">
            <div className="card-body">
              <h1 className=" text-3xl mt-[-10px] font-bold text-slate-700">
                Signup
              </h1>
              <p className=" text-lg text-slate-700 mb-2">
                Create New PowerHack Account
              </p>
              <div>
                <form
                  className="grid grid-cols-1 gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    className="input input-bordered"
                    placeholder="Enter Your Name"
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
                    placeholder="Enter Your Email"
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
                    placeholder="Password"
                    className="input input-bordered"
                    type="password"
                    {...register('password', {
                      required: (
                        <span className=" text-error">
                          Password Input is Blank
                        </span>
                      ),
                      minLength: {
                        value: 6,
                        message: 'Minimum Length Upto 6',
                      },
                    })}
                  />
                  {errors.password && (
                    <span role="alert">{errors.password.message}</span>
                  )}
                  <p>
                    Already Have An Account?{' '}
                    <Link
                      className=" text-orange-600 text-lg font-semibold"
                      to="/login"
                    >
                      Login
                    </Link>{' '}
                  </p>
                  <input
                    className="btn btn-ghost bg-slate-800 text-white"
                    type="submit"
                    value="Signup"
                  />
                </form>

                <div className="divider">OR</div>

                <div className=" grid grid-cols-2 gap-x-6">
                  <button className="btn outline-0 border-0 bg-slate-700">
                    Google
                  </button>
                  <button className="btn outline-0  border-0 bg-orange-600">
                    Github
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
