import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';
import { EventType } from '../../types/types';

const EventOverviewNameAndPicture = loadable(
  () => import('./eventOverviewNameAndPicture')
);
const EventOverviewDescription = loadable(
  () => import('./eventOverviewDescription')
);
const EventOverviewVenue = loadable(() => import('./eventOverviewVenue'));
const EventOverviewDateAndTime = loadable(
  () => import('./eventOverviewDateAndTime')
);
const EventOverviewInvitedBy = loadable(
  () => import('./eventOverviewInvitedBy')
);
const EventOverviewStatus = loadable(() => import('./eventOverviewStatus'));

export default function EventOverview({
  fetchedEvent,
}: PropsWithChildren<{ fetchedEvent: EventType }>) {
  return (
    <div className={['container-fluid'].join(' ')}>
      <div className={['row'].join(' ')}>
        <div className={['col'].join(' ')}>
          <EventOverviewNameAndPicture
            name={fetchedEvent.name}
            fireId={fetchedEvent.fireId}
          />
        </div>
        <div className={['col'].join(' ')}>
          <EventOverviewDescription description={fetchedEvent.description} />
        </div>
        {fetchedEvent.invitedBy ? (
          <>
            <div className={['col'].join(' ')}>
              <EventOverviewInvitedBy invitedBy={fetchedEvent.invitedBy} />
            </div>
            <div className={['col'].join(' ')}>
              <EventOverviewStatus
                status={fetchedEvent.status!}
                dateTime={fetchedEvent.time}
                id={fetchedEvent.id}
              />
            </div>
          </>
        ) : null}
        <div className={['col'].join(' ')}>
          <EventOverviewVenue venue={fetchedEvent.venue} />
        </div>
        <div className={['col'].join(' ')}>
          <EventOverviewDateAndTime time={fetchedEvent.time} />
        </div>
      </div>
    </div>
  );
}
