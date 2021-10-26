import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { Container, Row } from 'reactstrap';

import { useEventsFetcher } from '../../services/events-fetcher-service';
import EventCard from '../eventCard/eventCard';
import InlineSpinner from '../spinner/inlineSpinner';

import * as styles from './styles';

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
        <styles.Column key={event.id}>
          <Link href={`events/${event.id}`}>
            <styles.EventLink role="button">
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
            </styles.EventLink>
          </Link>
        </styles.Column>
      );
    }

    return null;
  });

  if (loading) {
    return <InlineSpinner />;
  }

  return (
    <Container fluid>
      <Row data-testid="created-events-container">{content}</Row>
    </Container>
  );
}
