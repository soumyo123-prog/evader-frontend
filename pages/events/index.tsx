import React from 'react';
import loadable from '@loadable/component';
import Sidebar from '../../components/sidebar/sidebar';
import { useAuth } from '../../context/auth';
import { useSidebar } from '../../context/sidebar';
import MainContentWrapper from '../../utils/main-content-wrapper';
import Redirect from '../../utils/redirector';
import Wrapper from '../../utils/sidebar-content-wrapper';
import EventNavbar from '../../components/eventNavbar/eventNavbar';

const AddEventForm = loadable(
  () => import('../../components/addEventForm/addEventForm')
);
const AddEventButton = loadable(
  () => import('../../components/addButton/addButton')
);

const EventsPage = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const { setActive } = useSidebar();
  const { token } = useAuth();

  const addClickHandler = () => {
    setShow((prev) => !prev);
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
            <EventNavbar />
            <AddEventForm show={show} />
            <AddEventButton clickHandler={addClickHandler} open={show} />
          </MainContentWrapper>
        </Wrapper>
      </>
    );
  }

  return content;
};

export default EventsPage;
