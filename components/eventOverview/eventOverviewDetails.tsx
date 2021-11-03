import React, { PropsWithChildren } from 'react';

import { useEventAvatarFetcherService } from '../../services/event-avatar-fetcher-service';

import * as styles from './styles';

export default function EventOverviewDetails({
  name,
  description,
  fireId,
}: PropsWithChildren<{ name: string; fireId: string; description: string }>) {
  const url = useEventAvatarFetcherService(fireId);

  return (
    <styles.OverviewDetailsContainer>
      <styles.PictureContainer>
        <img
          src={
            url || `https://avatars.dicebear.com/api/jdenticon/${fireId}.svg`
          }
          alt=""
        />
      </styles.PictureContainer>
      <styles.Name>{name}</styles.Name>
      <styles.Description>{description}</styles.Description>
    </styles.OverviewDetailsContainer>
  );
}
