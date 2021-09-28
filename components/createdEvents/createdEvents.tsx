import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/auth';
import useEventsFetcher from '../../services/events-fetcher-service';
import CreatedEventCard from '../createdEventCard/createdEventCard';
import classes from './createdEvents.module.scss';
import InlineSpinner from '../spinner/inlineSpinner';

export default function CreatedEvents() {
  const { token } = useAuth();
  const { events, loading } = useEventsFetcher(token!);

  const content = events.map((event) => (
    <div
      className={['col', classes.event_card_container].join(' ')}
      key={event.id}
    >
      <Link href={`events/${event.id}`}>
        <a
          className={['d-block', classes.event_card_link].join(' ')}
          role="button"
        >
          <CreatedEventCard
            id={event.id}
            name={event.name}
            description={event.description}
            venue={event.venue}
            time={event.time}
            fireId={event.fireId}
          />
        </a>
      </Link>
    </div>
  ));

  if (loading) {
    return <InlineSpinner />;
  }

  return (
    <div className={['container-fluid'].join(' ')}>
      <div className={['row'].join(' ')}>{content}</div>
    </div>
  );
}
