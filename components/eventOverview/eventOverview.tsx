import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';
import { Container, Row } from 'reactstrap';
import { EventType } from '../../types/types';

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
        <div className={['col-12 p-3'].join(' ')}>
          <EventOverviewDetails
            name={fetchedEvent.name}
            fireId={fetchedEvent.fireId}
            description={fetchedEvent.description}
          />
        </div>
        {fetchedEvent.invitedBy ? (
          <>
            <div className={['col-12 p-3'].join(' ')}>
              <EventOverviewInvitedBy invitedBy={fetchedEvent.invitedBy} />
            </div>
            <div className={['col-12 p-3'].join(' ')}>
              <EventOverviewStatus
                status={fetchedEvent.status!}
                dateTime={fetchedEvent.time}
                id={fetchedEvent.id}
              />
            </div>
          </>
        ) : null}
        <div className={['col-12 p-3'].join(' ')}>
          <EventOverviewTable
            venue={fetchedEvent.venue}
            time={fetchedEvent.time}
          />
        </div>
      </Row>
    </Container>
  );
}
