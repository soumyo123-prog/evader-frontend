import React from 'react';
import Link from 'next/link';
import { useEventsFetcher } from '../../services/events-fetcher-service';
import EventCard from '../eventCard/eventCard';
import classes from './createdEvents.module.scss';
import InlineSpinner from '../spinner/inlineSpinner';

export default function CreatedEvents() {
  const { events, loading } = useEventsFetcher();

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
          <EventCard
            id={event.id}
            name={event.name}
            description={event.description}
            venue={event.venue}
            time={event.time}
            fireId={event.fireId}
            status={undefined}
            invitedBy={undefined}
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
      <div className={['row'].join(' ')} data-testid="created-events-container">
        {content}
      </div>
    </div>
  );
}
