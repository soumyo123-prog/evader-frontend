import React from 'react';
import { useAuth } from '@/context/auth';
import IsAuth from '../components/root/isAuth';
import IsNotAuth from '../components/root/isNotAuth';

const Home = () => {
  const { token } = useAuth();

  if (token) {
    return <IsAuth />;
  }
  return <IsNotAuth />;
};

export default Home;
