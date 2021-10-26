import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import useInvitedEventsFetcher from '../../services/fetch-invited-events-service';
import classes from './invitedEvents.module.scss';
import EventCard from '../eventCard/eventCard';

export default function InvitedEvents({
  filter,
}: PropsWithChildren<{ filter: string }>) {
  const invitedEvents = useInvitedEventsFetcher();

  const content = invitedEvents.map((event) => {
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
          <Link href={`events/invited/${event.id}`}>
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
                status={event.status}
                invitedBy={event.invitedBy}
              />
            </a>
          </Link>
        </div>
      );
    }

    return null;
  });

  return (
    <div className={['container-fluid'].join(' ')}>
      <div className={['row'].join(' ')}>{content}</div>
    </div>
  );
}
