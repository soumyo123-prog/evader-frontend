import React from 'react';
import { useAuth } from '@/context/auth';
import IsAuth from '../components/root/isAuth';
import IsNotAuth from '../components/root/isNotAuth';

const Home = () => {
  const { fireUser } = useAuth();

  if (fireUser) {
    return <IsAuth />;
  }
  return <IsNotAuth />;
};

export default Home;
