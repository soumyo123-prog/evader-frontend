import React from 'react';
import Spinner from '../../components/spinner/spinner';
import { useAuth } from '../../context/auth';
import { useSidebar } from '../../context/sidebar';
import Redirect from '../../utils/redirector';

const Events = React.lazy(() => import('../../components/events/events'));

const EventsPage = () => {
  const { setActive } = useSidebar();
  const { token } = useAuth();

  React.useEffect(() => {
    setActive('events');
  }, []);

  let content = (
    <React.Suspense fallback={<Spinner />}>
      <Events />
    </React.Suspense>
  );

  if (!token) {
    content = <Redirect to="/" />;
  }

  return content;
};

export default EventsPage;
