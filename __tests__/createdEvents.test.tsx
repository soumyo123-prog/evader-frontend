import React from 'react';
import { render } from '@testing-library/react';
import { EventType } from '../types/types';
import * as eventsFetcherService from '../services/events-fetcher-service';
import CreatedEvents from '../components/createdEvents/createdEvents';

const mockEvents: EventType[] = [
  {
    id: 1,
    name: 'event 1',
    description: 'this is event 1',
    fireId: '1',
    time: '2021-10-16T20:30:00Z',
    venue: 'This is a dummy address',
  } as EventType,
  {
    id: 2,
    name: 'event 2',
    description: 'this is event 2',
    fireId: '2',
    time: '2021-10-16T20:30:00Z',
    venue: 'This is a dummy address',
  } as EventType,
  {
    id: 3,
    name: 'event 3',
    description: 'this is event 3',
    fireId: '3',
    time: '2021-10-16T20:30:00Z',
    venue: 'This is a dummy address',
  } as EventType,
];

describe('Created events component', () => {
  it('should render events when fully fetched all of them', () => {
    jest
      .spyOn(eventsFetcherService, 'useEventsFetcher')
      .mockImplementation(() => ({
        events: mockEvents,
        loading: false,
      }));

    const component = render(<CreatedEvents />);
    expect(
      component.getByTestId('created-events-container')
    ).toBeInTheDocument();
    expect(
      component.getByTestId('created-events-container').children.length
    ).toEqual(3);
    expect(
      component.queryByTestId('created-events-spinner')
    ).not.toBeInTheDocument();
  });

  it('should render spinner when data is not fullt fetched', () => {
    jest
      .spyOn(eventsFetcherService, 'useEventsFetcher')
      .mockImplementation(() => ({
        events: [],
        loading: true,
      }));

    const component = render(<CreatedEvents />);
    expect(component.getByTestId('inline-spinner')).toBeInTheDocument();
    expect(
      component.queryByTestId('created-events-container')
    ).not.toBeInTheDocument();
  });
});

export {};
