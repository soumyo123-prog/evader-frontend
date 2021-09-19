import React from 'react';
import fetchProfileData from '@/services/fetch-profile-data-service';

import { useAuth } from '@/context/auth';

export default function IsAuth() {
  const { token, setBackendUser } = useAuth();

  React.useEffect(() => {
    fetchProfileData(token!)
      .then((response) => {
        setBackendUser(response.data.user);
      })
      .catch(() => {});
  }, []);

  return <div>I am authenticated</div>;
}
