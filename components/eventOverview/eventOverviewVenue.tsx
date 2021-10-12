import React, { PropsWithChildren } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import classes from './eventOverview.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function EventOverviewVeue({
  venue,
}: PropsWithChildren<{ venue: string }>) {
  const getDirectionsHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const directionsURL = `https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude}&destination=${venue}`;
          window.open(directionsURL, '_blank');
        },
        (error) => {
          toast.error(error.message);
        }
      );
    } else {
      toast('Your browser does not support geolocation service');
    }
  };

  return (
    <>
      <div className={['card m-3 shadow', classes.min_width].join(' ')}>
        <div className={['card-header'].join(' ')}>Location</div>
        <div className={['card-body'].join(' ')}>
          <p className={['card-text'].join(' ')}>{venue}</p>
          <button
            className={['btn btn-primary'].join(' ')}
            type="button"
            onClick={getDirectionsHandler}
          >
            Get Directions
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
