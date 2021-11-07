import React, { PropsWithChildren } from 'react';

import * as styles from './styles';

export default function EventOverviewInvitedBy({
  invitedBy,
}: PropsWithChildren<{ invitedBy: string }>) {
  const name = invitedBy.split(' : ')[0];
  const email = invitedBy.split(' : ')[1];

  return (
    <styles.Creator>
      <h5>Invited By :</h5>
      <styles.PictureContainer>
        <img
          src={`https://avatars.dicebear.com/api/big-ears-neutral/${email}.svg`}
          alt=""
        />
      </styles.PictureContainer>
      <styles.Name>{name}</styles.Name>
      <p className={['card-text'].join(' ')}>{email}</p>
    </styles.Creator>
  );
}
