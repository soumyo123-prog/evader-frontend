import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';
import { Container, Row } from 'reactstrap';

import { EventType } from '../../types/types';

import * as styles from './styles';

const EventOverviewDetails = loadable(() => import('./eventOverviewDetails'));
const EventOverviewTable = loadable(() => import('./eventOverviewTable'));
const EventOverviewInvitedBy = loadable(
  () => import('./eventOverviewInvitedBy')
);
const EventOverviewStatus = loadable(() => import('./eventOverviewStatus'));

export default function EventOverview({
  fetchedEvent,
}: PropsWithChildren<{ fetchedEvent: EventType }>) {
  return (
    <Container fluid>
      <Row>
        <styles.Column xs="12">
          <EventOverviewDetails
            name={fetchedEvent.name}
            fireId={fetchedEvent.fireId}
            description={fetchedEvent.description}
          />
        </styles.Column>
        {fetchedEvent.invitedBy ? (
          <>
            <styles.Column xs="12">
              <EventOverviewInvitedBy invitedBy={fetchedEvent.invitedBy} />
            </styles.Column>
            <styles.Column xs="12">
              <EventOverviewStatus
                status={fetchedEvent.status!}
                dateTime={fetchedEvent.time}
                id={fetchedEvent.id}
              />
            </styles.Column>
          </>
        ) : null}
        <styles.Column xs="12">
          <EventOverviewTable
            venue={fetchedEvent.venue}
            time={fetchedEvent.time}
            name={fetchedEvent.name}
            description={fetchedEvent.description}
          />
        </styles.Column>
      </Row>
    </Container>
  );
}
