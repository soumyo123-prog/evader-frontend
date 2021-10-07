import React, { PropsWithChildren } from 'react';
import loadable from '@loadable/component';
import { toast, ToastContainer } from 'react-toastify';
import useFetchGuests from '../../services/fetch-guests-service';
import classes from './guests.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const Guest = loadable(() => import('../guest/guest'));

export default function Guests({
  eventId,
}: PropsWithChildren<{ eventId: string }>) {
  const { guests, error } = useFetchGuests(eventId);

  React.useEffect(() => {
    if (error) {
      if (error === 404) {
        toast('Event with this id not found');
      } else if (error === 403) {
        toast('User not permitted to access this event guest list');
      } else {
        toast('Request failed with status code 400');
      }
    }
  }, [error]);

  const guestCards = guests.map((guest) => (
    <div
      className={['col', classes.guest_card_container].join(' ')}
      key={guest.email}
    >
      <Guest name={guest.name} email={guest.email} status={guest.status} />
    </div>
  ));

  return (
    <>
      <div className={['container-fluid'].join(' ')}>
        <div className={['row'].join(' ')}>{guestCards}</div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
