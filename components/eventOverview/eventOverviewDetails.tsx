import React, { PropsWithChildren } from 'react';
import { useEventAvatarFetcherService } from '../../services/event-avatar-fetcher-service';
import classes from './eventOverview.module.scss';

export default function EventOverviewDetails({
  name,
  description,
  fireId,
}: PropsWithChildren<{ name: string; fireId: string; description: string }>) {
  const url = useEventAvatarFetcherService(fireId);

  return (
    <div
      className={[
        'd-flex flex-column align-items-center border shadow w-100 p-2',
      ].join(' ')}
    >
      <div
        className={[
          'd-flex justify-content-center align-items-center',
          'p-2',
          classes.picture_container,
        ].join(' ')}
      >
        <img
          src={
            url || `https://avatars.dicebear.com/api/jdenticon/${fireId}.svg`
          }
          alt=""
        />
      </div>
      <h5 className={['text-capitalize mt-2'].join(' ')}>{name}</h5>
      <p className={['text-center w-75'].join(' ')}>{description}</p>
    </div>
  );
}
