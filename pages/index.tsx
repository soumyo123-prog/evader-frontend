import React from 'react';
import { useAuth } from '../context/auth';
import IsNotAuth from '../components/home/isNotAuth';
import { useSidebar } from '../context/sidebar';
import fetchProfileData from '../services/fetch-profile-data-service';
import Wrapper from '../utils/sidebar-content-wrapper';
import Sidebar from '../components/sidebar/sidebar';
import Spinner from '../components/spinner/spinner';

const Home = () => {
  const { loading, token, setBackendUser } = useAuth();
  const { setActive } = useSidebar();

  React.useEffect(() => {
    if (token) {
      fetchProfileData(token!)
        .then((response) => {
          setBackendUser(response.data.user);
        })
        .catch(() => {});
    }
  }, [token]);

  React.useEffect(() => {
    setActive('home');
  }, []);

  let content = loading ? (
    <Spinner text="Trying to log you in..." />
  ) : (
    <IsNotAuth />
  );
  if (token) {
    content = (
      <>
        <Wrapper>
          <Sidebar />
        </Wrapper>
      </>
    );
  }
  return content;
};

export default Home;
