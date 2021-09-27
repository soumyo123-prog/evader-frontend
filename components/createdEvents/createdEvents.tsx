import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/auth';
import eventsFetcher from '../../services/events-fetcher-service';
import { EventType } from '../../types/types';
import CreatedEventCard from '../createdEventCard/createdEventCard';
import classes from './createdEvents.module.scss';

export default function CreatedEvents() {
  const [events, setEvents] = React.useState<EventType[]>([]);
  const { token } = useAuth();

  React.useEffect(() => {
    eventsFetcher(token!)
      .then((res) => {
        setEvents(res.data);
      })
      .catch(() => {});
  }, []);

  const content = events.map((event) => (
    <div
      className={['col', classes.event_card_container].join(' ')}
      key={event.id}
    >
      <Link href="/">
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

  return (
    <div className={['container-fluid'].join(' ')}>
      <div className={['row'].join(' ')}>{content}</div>
    </div>
  );
}
