import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { Table } from 'reactstrap';

import 'react-toastify/dist/ReactToastify.css';

export default function EventOverviewTable({
  time,
  venue,
}: PropsWithChildren<{ time: string; venue: string }>) {
  const addToGoogleCalendar = () => {};

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
      toast.error('Your browser does not support geolocation service');
    }
  };

  return (
    <div
      className={[
        'd-flex flex-column align-items-start justify-content-center border shadow w-100 p-2',
      ].join(' ')}
    >
      <Table borderless className={['mb-0'].join(' ')}>
        <tbody>
          <tr>
            <td>
              <strong>Location</strong>
            </td>
            <td>{venue}</td>
            <td>
              <button
                className={['btn btn-primary ms-2'].join(' ')}
                type="button"
                onClick={getDirectionsHandler}
              >
                Get Directions
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Date and Time</strong>
            </td>
            <td>{moment(time).format('dddd, MMMM Do YYYY, h:mm a')}</td>
            <td>
              <button
                className={['btn btn-primary ms-2'].join(' ')}
                type="button"
                onClick={addToGoogleCalendar}
              >
                Add to Calendar
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
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
    </div>
  );
}
