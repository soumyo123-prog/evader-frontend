import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { HiLocationMarker } from 'react-icons/hi';
import { IoTimeSharp } from 'react-icons/io5';
import { BsCalendarFill } from 'react-icons/bs';
import classes from './createdEventCard.module.scss';
import { EventType } from '../../types/types';

export default function CreatedEventCard({
  id,
  name,
  description,
  venue,
  time,
  photoUrl,
}: PropsWithChildren<EventType>) {
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
          src={photoUrl}
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
          {moment(time).add(5, 'hours').add(30, 'minutes').format('h:mm A')}
        </p>
      </div>
    </div>
  );
}
