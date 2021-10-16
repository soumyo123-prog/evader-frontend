import React from 'react';
import loadable from '@loadable/component';
import Sidebar from '../../components/sidebar/sidebar';
import { useAuth } from '../../context/auth';
import { useSidebar } from '../../context/sidebar';
import MainContentWrapper from '../../utils/main-content-wrapper';
import Redirect from '../../utils/redirector';
import Wrapper from '../../utils/sidebar-content-wrapper';
import EventsNavbar from '../../components/eventsNavbar/eventsNavbar';

const AddEventButton = loadable(
  () => import('../../components/addButton/addButton')
);
const AddEventForm = loadable(
  () => import('../../components/addEventForm/addEventForm')
);
const CreatedEvents = loadable(
  () => import('../../components/createdEvents/createdEvents')
);
const InvitedEvents = loadable(
  () => import('../../components/invitedEvents/invitedEvents')
);

const EventsPage = () => {
  const [open, setOpen] = React.useState(false);
  const [choosen, setChoosen] = React.useState<string>('Created');
  const { setActive } = useSidebar();
  const { token } = useAuth();

  const navItemClickHandler = (button: string) => {
    setChoosen(button);
  };

  const addClickHandler = () => {
    setOpen((prev) => !prev);
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
            {open ? (
              <AddEventForm />
            ) : (
              <>
                <EventsNavbar
                  choosen={choosen}
                  clickHandler={navItemClickHandler}
                />
                {choosen === 'Created' ? <CreatedEvents /> : <InvitedEvents />}
              </>
            )}
            <AddEventButton clickHandler={addClickHandler} open={open} />
          </MainContentWrapper>
        </Wrapper>
      </>
    );
  }

  return content;
};

export default EventsPage;
