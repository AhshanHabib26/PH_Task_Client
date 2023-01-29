import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      return toast.error('Please Add an Email & Password');
    }

    const inputData = {
      email: data.email,
      password: data.password,
    };

    fetch(`http://localhost:5000/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          localStorage.setItem('accessToken', data.token);
          navigate('/billing-dashboard');
        } else {
          toast.error(data.error);
        }
        setLoading(false);
      });
  };

  return (
    <div className=" px-5 lg:px-0 flex items-center bg-slate-800 min-h-screen">
      {loading && <Spinner />}
      <div class="card  mx-auto bg-base-100 border">
        <div className="card-body">
          <h1 className=" text-3xl mt-[-10px] font-bold text-slate-700">
            Login
          </h1>
          <p className=" text-lg text-slate-700 mb-2">
            Access PowerHack using your Email and Password.
          </p>
          <div>
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="input input-bordered"
                placeholder="Enter Your Email"
                type="email"
                {...register('email', { pattern: /\S+@\S+\.\S+/ })}
              />
              <input
                placeholder="Password"
                className="input input-bordered"
                type="password"
                {...register('password')}
              />
              <label className="label">
                <p>
                  You Have Not An Account, Please?{' '}
                  <Link
                    className=" text-orange-600 text-lg font-semibold"
                    to="/register"
                  >
                    Signup
                  </Link>{' '}
                </p>
              </label>
              <input
                className="btn btn-ghost bg-slate-800 text-white"
                type="submit"
                value="Login"
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
  );
};

export default Login;
