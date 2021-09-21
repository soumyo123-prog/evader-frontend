import React from 'react';
import fetchProfileData from '../../services/fetch-profile-data-service';

import { useAuth } from '../../context/auth';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import Wrapper from '../../utils/sidebar-content-wrapper';

export default function IsAuth() {
  const { token, setBackendUser } = useAuth();

  React.useEffect(() => {
    fetchProfileData(token!)
      .then((response) => {
        setBackendUser(response.data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper>
        <Sidebar />
      </Wrapper>
    </>
  );
}
