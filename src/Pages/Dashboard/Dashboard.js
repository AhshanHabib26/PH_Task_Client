import React from 'react';
import { useQuery } from 'react-query';
import BillingModal from './BillingModal';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const { data, isLoading, refetch } = useQuery('total-billing-amount', () =>
    fetch(`https://ph-task-server.vercel.app/total-payable-amount`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <p>Wait...</p> ;
  }

  return (
    <div>
      <Navbar refetch={refetch} data={data?.totalAmount} />
      <SearchBar />
      <BillingModal refetch={refetch} />
    </div>
  );
};

export default Dashboard;
