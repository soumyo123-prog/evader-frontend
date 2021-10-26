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
  const [filter, setFilter] = React.useState('upcoming');
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

  React.useEffect(() => {
    document.addEventListener('event_created', () => {
      setOpen(false);
    });
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
                  filter={filter}
                  changeFilterHandler={(val: string) => setFilter(val)}
                />
                {choosen === 'Created' ? (
                  <CreatedEvents filter={filter} />
                ) : (
                  <InvitedEvents filter={filter} />
                )}
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
