import React, { PropsWithChildren } from 'react';
import { InvitationStatus } from '../eventOverview/eventOverviewStatus';
import classes from './guest.module.scss';

export default function Guest({
  name,
  email,
  status,
}: PropsWithChildren<{ name: string; email: string; status: number }>) {
  return (
    <div
      className={[
        'card',
        'd-flex flex-column justify-content-center align-items-center',
        classes.guest_card_container,
      ].join(' ')}
    >
      <img
        src={`https://avatars.dicebear.com/api/big-ears-neutral/${email}.svg`}
        className={['card-img-top', classes.guest_picture].join(' ')}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
        <p className="card-text text-center text-info">{email}</p>
      </div>
      <div className="card-footer w-100 d-flex flex-column align-items-center">
        <strong>Status:</strong>
        <p
          className={[
            'h5 text-uppercase',
            `${status === 0 ? 'text-primary' : 'evader-dummy'}`,
            `${status === 1 ? 'text-success' : 'evader-dummy'}`,
            `${status === 2 ? 'text-danger' : 'evader-dummy'}`,
          ].join(' ')}
        >
          {InvitationStatus[status]}{' '}
        </p>
      </div>
    </div>
  );
}
