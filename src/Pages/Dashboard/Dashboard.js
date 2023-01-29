import React from 'react';
import { useQuery } from 'react-query';
import BillingModal from './BillingModal';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const { data, isLoading, refetch } = useQuery('total-billing-amount', () =>
    fetch(`http://localhost:5000/total-payable-amount`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <p>Wait.......</p>;
  }

  return (
    <div>
      <Navbar data={data} />
      <SearchBar />
      <BillingModal refetch={refetch} />
    </div>
  );
};

export default Dashboard;
