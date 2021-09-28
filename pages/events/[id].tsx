import { useRouter } from 'next/router';
import React from 'react';
import EventCoverPhoto from '../../components/eventCoverPhoto/eventCoverPhoto';
import EventNavbar from '../../components/eventNavbar/eventNavbar';
import Sidebar from '../../components/sidebar/sidebar';
import { useAuth } from '../../context/auth';
import MainContentWrapper from '../../utils/main-content-wrapper';
import Redirect from '../../utils/redirector';
import Wrapper from '../../utils/sidebar-content-wrapper';

export default function EventPage() {
  const [id, setId] = React.useState<string>('');
  const { token } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    setId(router.query.id);
  }, []);

  let content = <Redirect to="/" />;
  if (token) {
    content = (
      <Wrapper>
        <Sidebar />
        <MainContentWrapper>
          <EventNavbar />
        </MainContentWrapper>
      </Wrapper>
    );
  }

  return content;
}
