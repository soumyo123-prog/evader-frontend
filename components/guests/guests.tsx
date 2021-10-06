import React, { PropsWithChildren } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useFetchGuests from '../../services/fetch-guests-service';
import classes from './guests.module.scss';
import 'react-toastify/dist/ReactToastify.css';

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

  return (
    <>
      <div> I am the guest </div>
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
