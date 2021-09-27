import React from 'react';
import loadable from '@loadable/component';
import { useRouter } from 'next/router';
import Sidebar from '../../components/sidebar/sidebar';
import { useAuth } from '../../context/auth';
import { useSidebar } from '../../context/sidebar';
import MainContentWrapper from '../../utils/main-content-wrapper';
import Redirect from '../../utils/redirector';
import Wrapper from '../../utils/sidebar-content-wrapper';
import EventNavbar from '../../components/eventNavbar/eventNavbar';

const AddEventButton = loadable(
  () => import('../../components/addButton/addButton')
);
const CreatedEvents = loadable(
  () => import('../../components/createdEvents/createdEvents')
);

const EventsPage = () => {
  const [choosen, setChoosen] = React.useState<string>('Created');
  const { setActive } = useSidebar();
  const { token } = useAuth();
  const router = useRouter();

  const navItemClickHandler = (button: string) => {
    setChoosen(button);
  };

  const addClickHandler = () => {
    router.push('/events/create');
  };

  React.useEffect(() => {
    setActive('events');
  }, []);

  let content = <Redirect to="/" />;
  if (token) {
    content = (
      <>
        <Wrapper>
          <Sidebar />
          <MainContentWrapper>
            <EventNavbar choosen={choosen} clickHandler={navItemClickHandler} />
            {choosen === 'Created' ? <CreatedEvents /> : null}
            <AddEventButton clickHandler={addClickHandler} open={false} />
          </MainContentWrapper>
        </Wrapper>
      </>
    );
  }

  return content;
};

export default EventsPage;
