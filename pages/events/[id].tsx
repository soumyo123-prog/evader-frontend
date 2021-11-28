import loadable from '@loadable/component';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';

import EventSettings from '../../components/eventSettings/eventSettings';
import Sidebar from '../../components/sidebar/sidebar';
import MainContentWrapper from '../../utils/main-content-wrapper';
import Redirect from '../../utils/redirector';
import Wrapper from '../../utils/sidebar-content-wrapper';
import { useAuth } from '../../context/auth';
import useEventFetcher from '../../services/event-fetcher-service';

const EventNavbar = loadable(
  () => import('../../components/eventNavbar/eventNavbar')
);
const EventOverview = loadable(
  () => import('../../components/eventOverview/eventOverview')
);
const Expenditure = loadable(
  () => import('../../components/expenditure/expenditure')
);
const Guests = loadable(() => import('../../components/guests/guests'));

export default function EventPage() {
  const [active, setActive] = React.useState<string>('overview');
  const { token } = useAuth();
  const router = useRouter();
  const id = router.query.id as string;
  const { event, error } = useEventFetcher(id);

  const fields = ['overview', 'guests', 'expenditure', 'event settings'];

  const upcoming = new Date(event.time).getTime() >= new Date().getTime();
  if (!upcoming) {
    fields.pop();
    fields.pop();
  }

  const changeActiveHandler = (newActive: string) => {
    setActive(newActive);
  };

  let content = <Redirect to="/" />;
  if (token && !error) {
    content = (
      <>
        <Head>
          <title>{event.name} | Evader</title>
        </Head>
        <Wrapper>
          <Sidebar />
          <MainContentWrapper color="#e6e6e6">
            <EventNavbar
              fields={fields}
              active={active}
              changeActive={changeActiveHandler}
            />
            {active === 'overview' && <EventOverview fetchedEvent={event} />}
            {active === 'guests' && (
              <Guests eventId={id} creator={Boolean(event.invitedBy)} />
            )}
            {active === 'expenditure' && <Expenditure id={id} />}
            {active === 'event settings' && upcoming && (
              <EventSettings id={id} fetchedEvent={event} />
            )}
          </MainContentWrapper>
        </Wrapper>
      </>
    );
  }

  return content;
}
