import React from 'react';
import { useAuth } from '../../context/auth';

import useUsageFetcher from '../../services/usage-fetcher-service';

import * as styles from './styles';

export default function IsAuth() {
  const [created, setCreated] = React.useState(0);
  const [invited, setInvited] = React.useState(0);

  const { fireUser } = useAuth();
  const usage = useUsageFetcher();

  React.useEffect(() => {
    if (created < usage.created) {
      setTimeout(() => setCreated((prev) => prev + 1), 200);
    }
    if (invited < usage.invited) {
      setTimeout(() => setInvited((prev) => prev + 1), 200);
    }
  }, [created, invited, usage]);

  return (
    <styles.IsAuthContainer>
      <styles.ImageContainer>
        <img
          src={`https://avatars.dicebear.com/api/big-ears-neutral/${fireUser?.email}.svg`}
          alt=""
        />
      </styles.ImageContainer>
      <styles.Intro>It&apos;s good to see you again,</styles.Intro>
      <styles.FullName>{fireUser?.displayName}</styles.FullName>
      <styles.UsageContainer>
        <styles.Usage>
          <div>Events Created</div>
          <styles.UsageParam>{created}</styles.UsageParam>
        </styles.Usage>
        <styles.Usage>
          <div>Events Invited</div>
          <styles.UsageParam>{invited}</styles.UsageParam>
        </styles.Usage>
      </styles.UsageContainer>
    </styles.IsAuthContainer>
  );
}
