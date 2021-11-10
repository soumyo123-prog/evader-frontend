import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { Container, Row } from 'reactstrap';

import useInvitedEventsFetcher from '../../services/fetch-invited-events-service';
import EventCard from '../eventCard/eventCard';
import NotFound from '../notFound/notFound';

import * as styles from './styles';

export default function InvitedEvents({
  filter,
}: PropsWithChildren<{ filter: string }>) {
  const invitedEvents = useInvitedEventsFetcher();
  const text = 'Nothing Found';

  let content = invitedEvents.map((event) => {
    const upcoming = new Date(event.time).getTime() - new Date().getTime();

    if (
      (filter === 'upcoming' && upcoming >= 0) ||
      (filter === 'completed' && upcoming < 0)
    ) {
      return (
        <styles.CardContainer key={event.id}>
          <Link href={`events/invited/${event.id}`}>
            <styles.CardLink role="button">
              <EventCard
                id={event.id}
                name={event.name}
                description={event.description}
                venue={event.venue}
                time={event.time}
                duration={event.duration}
                fireId={event.fireId}
                status={event.status}
                invitedBy={event.invitedBy}
              />
            </styles.CardLink>
          </Link>
        </styles.CardContainer>
      );
    }

    return null;
  });
  content = content.filter((event) => !!event);

  return (
    <Container fluid>
      <Row>{content}</Row>
      <Row>{content.length === 0 && <NotFound text={text} />}</Row>
    </Container>
  );
}
