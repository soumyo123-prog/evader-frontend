import React from 'react';
import { useAuth } from '../context/auth';
import IsAuth from '../components/home/isAuth';
import IsNotAuth from '../components/home/isNotAuth';
import { useSidebar } from '../context/sidebar';

const Home = () => {
  const { token } = useAuth();
  const { setActive } = useSidebar();

  React.useEffect(() => {
    setActive('home');
  }, []);

  if (token) {
    return <IsAuth />;
  }
  return <IsNotAuth />;
};

export default Home;
