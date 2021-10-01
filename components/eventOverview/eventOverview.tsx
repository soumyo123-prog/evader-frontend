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

export default function EventOverview({
  fetchedEvent,
}: PropsWithChildren<{ fetchedEvent: EventType }>) {
  return (
    <>
      <EventOverviewNameAndPicture
        name={fetchedEvent.name}
        fireId={fetchedEvent.fireId}
      />
      <EventOverviewDescription description={fetchedEvent.description} />
      <EventOverviewVenue venue={fetchedEvent.venue} />
      <EventOverviewDateAndTime time={fetchedEvent.time} />
    </>
  );
}
