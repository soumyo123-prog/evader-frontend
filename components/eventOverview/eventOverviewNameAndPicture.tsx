import React, { PropsWithChildren } from 'react';
import useEventAvatarFetcherService from '../../services/event-avatar-fetcher-service';
import classes from './eventOverview.module.scss';

export default function EventOverviewNameAndPicture({
  name,
  fireId,
}: PropsWithChildren<{ name: string; fireId: string }>) {
  const url = useEventAvatarFetcherService(fireId);

  return (
    <div className={['card m-3'].join(' ')}>
      <div className={['card-header bg-primary text-light h5'].join(' ')}>
        Name
      </div>
      <div
        className={[
          'card-body',
          'bg-dark text-light',
          'd-flex flex-column align-items-center',
        ].join(' ')}
      >
        <div
          className={[
            'd-flex justify-content-center align-items-center',
            classes.picture_container,
          ].join(' ')}
        >
          <img
            src={
              url || `https://avatars.dicebear.com/api/identicon/${fireId}.svg`
            }
            alt=""
          />
        </div>
        <h5 className={['card-title text-capitalize mt-2'].join(' ')}>
          {name}
        </h5>
      </div>
    </div>
  );
}
