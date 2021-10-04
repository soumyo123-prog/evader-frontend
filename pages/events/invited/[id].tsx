import loadable from '@loadable/component';
import { useRouter } from 'next/router';
import React from 'react';
import Sidebar from '../../../components/sidebar/sidebar';
import { useAuth } from '../../../context/auth';
import useEventInvitedFetcher from '../../../services/event-invited-fetcher';
import MainContentWrapper from '../../../utils/main-content-wrapper';
import Redirect from '../../../utils/redirector';
import Wrapper from '../../../utils/sidebar-content-wrapper';

const EventOverview = loadable(
  () => import('../../../components/eventOverview/eventOverview')
);

export default function InvitedEventPage() {
  const { token } = useAuth();
  const router = useRouter();
  const id = router.query.id as string;
  const { event, error } = useEventInvitedFetcher(id);

  let content = <Redirect to="/" />;
  if (token && !error) {
    content = (
      <Wrapper>
        <Sidebar />
        <MainContentWrapper>
          <EventOverview fetchedEvent={event} />
        </MainContentWrapper>
      </Wrapper>
    );
  }

  return content;
}
