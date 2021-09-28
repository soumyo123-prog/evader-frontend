import React, { PropsWithChildren } from 'react';
import classes from './eventCoverPhoto.module.scss';

export default function EventCoverPhoto({
  id,
}: PropsWithChildren<{ id: string }>) {
  return (
    <div className={[classes.event_cover_photo_container].join(' ')}>
      <img
        className={[classes.event_cover_photo].join(' ')}
        src={`https://avatars.dicebear.com/api/jdenticon/${id}.svg`}
        alt=""
      />
    </div>
  );
}
