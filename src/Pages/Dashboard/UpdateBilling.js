import React from 'react';
import {  useLoaderData } from 'react-router-dom';

const UpdateBilling = () => {
    const  billingData = useLoaderData();
    console.log(billingData);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default UpdateBilling;
