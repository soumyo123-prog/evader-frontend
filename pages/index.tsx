import React from 'react';
import { useAuth } from '../context/auth';
import IsNotAuth from '../components/home/isNotAuth';
import { useSidebar } from '../context/sidebar';
import fetchProfileData from '../services/fetch-profile-data-service';
import Wrapper from '../utils/sidebar-content-wrapper';
import Sidebar from '../components/sidebar/sidebar';

const Home = () => {
  const { token, setBackendUser } = useAuth();
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

  let content = <IsNotAuth />;
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
