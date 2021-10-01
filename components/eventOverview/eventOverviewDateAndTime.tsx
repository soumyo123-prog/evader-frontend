import moment from 'moment';
import React, { PropsWithChildren } from 'react';

export default function EventOverviewDateAndTime({
  time,
}: PropsWithChildren<{ time: string }>) {
  const addToGoogleCalendar = () => {};

  return (
    <div className={['card m-3'].join(' ')}>
      <div className={['card-header bg-primary text-light h5'].join(' ')}>
        Date and Time
      </div>
      <div className={['card-body', 'bg-dark text-light'].join(' ')}>
        <p className={['card-text'].join(' ')}>
          {moment(time).format('dddd, MMMM Do YYYY, h:mm a')}
        </p>
        <button
          className={['btn btn-primary'].join(' ')}
          type="button"
          onClick={addToGoogleCalendar}
        >
          Add to Calendar
        </button>
      </div>
    </div>
  );
}
