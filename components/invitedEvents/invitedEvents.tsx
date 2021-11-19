import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { Container, Row, Table } from 'reactstrap';

import useInvitedEventsFetcher from '../../services/fetch-invited-events-service';
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
        <tr key={event.id}>
          <td>{event.name}</td>
          <td>
            <div>
              <styles.Date>
                {moment(event.time).format('ddd Do MMM')}
              </styles.Date>{' '}
              -{' '}
              <styles.Date>
                {moment(event.time)
                  .add(event.duration, 's')
                  .format('ddd Do MMM')}
              </styles.Date>
            </div>
            <div>
              <styles.Time>{moment(event.time).format('h:mm A')}</styles.Time> -{' '}
              <styles.Time>
                {moment(event.time).add(event.duration, 's').format('h:mm A')}
              </styles.Time>
            </div>
          </td>
          <td>
            <Link href={`events/invited/${event.id}`}>
              <a className="btn btn-outline-primary">
                <FaExpandArrowsAlt size="1.5rem" />
              </a>
            </Link>
          </td>
        </tr>
      );
    }

    return null;
  });
  content = content.filter((event) => !!event);

  return (
    <Container fluid>
      <Row>
        <Table>
          <thead style={{ fontSize: '0.9rem' }}>
            <tr>
              <styles.Heading>Name</styles.Heading>
              <styles.Heading>Timings</styles.Heading>
              <styles.Heading />
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </Table>
      </Row>
      <Row>{content.length === 0 && <NotFound text={text} />}</Row>
    </Container>
  );
}
