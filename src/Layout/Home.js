import React from 'react';
import { Link } from 'react-router-dom';
import imgBG from '../Image/mainBg.png';

const Home = () => {
  return (
    <div>
      <div class="hero min-h-screen bg-slate-800">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img alt="BG" src={imgBG} class=" max-w-sm w-[100] lg:max-w-xl" />
          <div>
            <h1 class=" text-4xl lg:text-6xl text-white font-bold">
              {' '}
              Power Hack is Power Distribution & Management Solution
            </h1>
            <p class="py-6 text-white">
              PowerHack System to Control and Manage User Account and User Data
              Easily Update & Delete
            </p>
            <Link to="/login">
              {' '}
              <button className=" text-white btn btn-outline uppercase border-emerald-400">
                Free Trial 1 Month
              </button>
            </Link>
            <div className="flex justify-between mt-8">
              <div className="divItem">
                <p className="text-white text-3xl font-bold">50+</p>
                <p className="text-white text-lg">Brand Owners</p>
              </div>
              <div className="divItem">
                <p className="text-white text-3xl font-bold">2K</p>
                <p className="text-white text-lg">Acive Account</p>
              </div>
              <div className="divItem">
                <p className="text-white text-3xl font-bold">100+</p>
                <p className="text-white text-lg">Our Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
