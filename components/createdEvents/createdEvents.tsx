import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useEventsFetcher } from '../../services/events-fetcher-service';
import EventCard from '../eventCard/eventCard';
import classes from './createdEvents.module.scss';
import InlineSpinner from '../spinner/inlineSpinner';

export default function CreatedEvents({
  filter,
}: PropsWithChildren<{ filter: string }>) {
  const { events, loading } = useEventsFetcher();

  const content = events.map((event) => {
    const upcoming = new Date(event.time).getTime() - new Date().getTime();

    if (
      (filter === 'upcoming' && upcoming >= 0) ||
      (filter === 'completed' && upcoming < 0)
    ) {
      return (
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
      );
    }

    return null;
  });

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
