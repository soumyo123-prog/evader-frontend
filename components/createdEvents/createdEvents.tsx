import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { Button, Container, Row, Table } from 'reactstrap';

import { useEventsFetcher } from '../../services/events-fetcher-service';
import InlineSpinner from '../spinner/inlineSpinner';
import NotFound from '../notFound/notFound';
import EventDeleterService from '../../services/event-deleter-service';
import EventEmitterService from '../../services/event-emitter-service';
import { useAuth } from '../../context/auth';
import firebase from '../../context/firebase';

import * as styles from './styles';

const db = firebase.firestore();

export default function CreatedEvents({
  filter,
}: PropsWithChildren<{ filter: string }>) {
  const { token } = useAuth();
  const { events, loading } = useEventsFetcher();
  const text = 'Nothing Found';

  const deleteClickHandler = async (e: any, id: number, fireId: string) => {
    e.preventDefault();
    await EventDeleterService(id, token!);
    await db.collection('events').doc(fireId).delete();
    EventEmitterService('event_deleted', { id });
  };

  let content = events.map((event) => {
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
            <Button
              outline
              color="danger"
              onClick={(e) => deleteClickHandler(e, event.id, event.fireId)}
            >
              <RiDeleteBin6Fill size="1.5rem" />
            </Button>
            <Link href={`events/${event.id}`}>
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

  if (loading) {
    return <InlineSpinner />;
  }

  return (
    <Container fluid>
      <Row data-testid="created-events-container">
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
