import React from 'react';
import Spinner from '../../components/spinner/spinner';
import { useSidebar } from '../../context/sidebar';

const Events = React.lazy(() => import('../../components/events/events'));

const EventsPage = () => {
  const { setActive } = useSidebar();

  React.useEffect(() => {
    setActive('events');
  }, []);

  return (
    <React.Suspense fallback={<Spinner />}>
      <Events />
    </React.Suspense>
  );
};

export default EventsPage;
