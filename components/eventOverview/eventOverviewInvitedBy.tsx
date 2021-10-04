import React, { PropsWithChildren } from 'react';

export default function EventOverviewInvitedBy({
  invitedBy,
}: PropsWithChildren<{ invitedBy: string }>) {
  const name = invitedBy.split(' : ')[0];
  const email = invitedBy.split(' : ')[1];

  return (
    <div className={['card m-3'].join(' ')}>
      <div className={['card-header bg-primary text-light h5'].join(' ')}>
        Invited By
      </div>
      <div className={['card-body', 'bg-dark text-light'].join(' ')}>
        <p className={['card-text'].join(' ')}>
          <strong>Name : </strong>
          {name}
        </p>
        <p className={['card-text'].join(' ')}>
          <strong>Email : </strong>
          {email}
        </p>
      </div>
    </div>
  );
}
