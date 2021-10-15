import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { HiLocationMarker } from 'react-icons/hi';
import { IoTimeSharp } from 'react-icons/io5';
import { BsCalendarFill } from 'react-icons/bs';
import classes from './eventCard.module.scss';
import { EventType } from '../../types/types';
import { useEventAvatarFetcherService } from '../../services/event-avatar-fetcher-service';

export default function EventCard({
  name,
  description,
  venue,
  time,
  fireId,
}: PropsWithChildren<EventType>) {
  const url = useEventAvatarFetcherService(fireId);

  return (
    <div
      className={[
        'card',
        'd-flex flex-column align-items-center justify-content-center',
        classes.card_container,
      ].join(' ')}
    >
      <div
        className={[
          'd-flex justify-content-center',
          classes.card_image_container,
        ].join(' ')}
      >
        <img
          className={['card-img-top', classes.card_photo].join(' ')}
          src={
            url || `https://avatars.dicebear.com/api/jdenticon/${fireId}.svg`
          }
          alt=""
        />
      </div>
      <div className={['card-body', classes.card_body].join(' ')}>
        <h5
          className={[
            'card-title',
            'd-flex justify-content-center',
            'text-capitalize',
          ].join(' ')}
        >
          {name}
        </h5>
        <p className={['card-text', 'd-flex justify-content-center'].join(' ')}>
          {description}
        </p>
        <p
          className={[
            'card-text',
            'd-flex justify-content-center align-items-center',
            'text-info',
          ].join(' ')}
        >
          <HiLocationMarker size="1.5rem" /> {venue}
        </p>
        <p
          className={[
            'card-text',
            'd-flex justify-content-center align-items-center',
            'text-dark',
          ].join(' ')}
        >
          <BsCalendarFill />
          {moment(time).format('dddd, MMM Do, YYYY')}
        </p>
        <p
          className={[
            'card-text',
            'd-flex justify-content-center align-items-center',
            'text-dark',
          ].join(' ')}
        >
          <IoTimeSharp size="1.5rem" />
          {moment(time).format('h:mm A')}
        </p>
      </div>
    </div>
  );
}
