import loadable from '@loadable/component';
import { useRouter } from 'next/router';
import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { useAuth } from '../../context/auth';
import useEventFetcher from '../../services/event-fetcher-service';
import MainContentWrapper from '../../utils/main-content-wrapper';
import Redirect from '../../utils/redirector';
import Wrapper from '../../utils/sidebar-content-wrapper';

const EventNavbar = loadable(
  () => import('../../components/eventNavbar/eventNavbar')
);
const EventOverview = loadable(
  () => import('../../components/eventOverview/eventOverview')
);
const EventInvitePeople = loadable(
  () => import('../../components/eventInvitePeople/eventInvitePeople')
);

export default function EventPage() {
  const [active, setActive] = React.useState<string>('overview');
  const { token } = useAuth();
  const router = useRouter();
  const id = router.query.id as string;
  const event = useEventFetcher(id);

  const changeActiveHandler = (newActive: string) => {
    setActive(newActive);
  };

  let content = <Redirect to="/" />;
  if (token) {
    content = (
      <Wrapper>
        <Sidebar />
        <MainContentWrapper>
          <EventNavbar active={active} changeActive={changeActiveHandler} />
          {active === 'overview' ? (
            <EventOverview fetchedEvent={event} />
          ) : null}
          {active === 'invite people' ? <EventInvitePeople id={id} /> : null}
        </MainContentWrapper>
      </Wrapper>
    );
  }

  return content;
}
