import React, { PropsWithChildren } from 'react';
import { useEventAvatarFetcherService } from '../../services/event-avatar-fetcher-service';
import classes from './eventOverview.module.scss';

export default function EventOverviewNameAndPicture({
  name,
  fireId,
}: PropsWithChildren<{ name: string; fireId: string }>) {
  const url = useEventAvatarFetcherService(fireId);

  return (
    <div className={['card m-3 shadow', classes.min_width].join(' ')}>
      <div className={['card-header h5'].join(' ')}>Name</div>
      <div
        className={['card-body', 'd-flex flex-column align-items-center'].join(
          ' '
        )}
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
        <h5 className={['card-title text-capitalize mt-2'].join(' ')}>
          {name}
        </h5>
      </div>
    </div>
  );
}
