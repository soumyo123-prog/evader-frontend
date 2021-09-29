import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';
import { EventType } from '../../types/types';
// import classes from './eventOverview.module.scss';

const EventOverviewNameAndPicture = loadable(
  () => import('./eventOverviewNameAndPicture')
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
      <div>Description</div>
      <div>Venue and Time</div>
      <div>Venue details and directions from current location</div>
    </>
  );
}
