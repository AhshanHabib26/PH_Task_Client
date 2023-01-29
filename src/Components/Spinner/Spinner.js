import React from 'react';
import SpinnerImg from '../../Image/spinner.gif';

const Spinner = () => {
  return (
    <div className=" max-w-xl mx-auto">
      <img className="w-50" src={SpinnerImg} alt="" />
    </div>
  );
};

export default Spinner;
