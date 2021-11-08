import React, { PropsWithChildren } from 'react';

import { HiLocationMarker } from 'react-icons/hi';
import { BsCalendarFill } from 'react-icons/bs';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

declare let gapi: any;

export default function EventOverviewTable({
  time,
  duration,
  venue,
  name,
  description,
}: PropsWithChildren<{
  time: string;
  duration: number;
  venue: string;
  name: string;
  description: string;
}>) {
  const addToGoogleCalendar = async () => {
    const event = {
      summary: name,
      description,
      location: venue,
      start: { dateTime: time },
      end: { dateTime: moment(time).add(duration, 's').toISOString() },
    };

    try {
      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      toast.success('Event added to Google Calendar');
    } catch (err) {
      toast.error('Failed to add event to Google Calendar');
    }
  };

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
    <styles.OverviewTableContainer>
      <styles.OverviewTable borderless>
        <tbody>
          <tr>
            <styles.LocationIcon>
              <HiLocationMarker size="2rem" />
            </styles.LocationIcon>
            <td>{venue}</td>
            <td>
              <styles.TableButton
                color="primary"
                type="button"
                onClick={getDirectionsHandler}
              >
                Get Directions
              </styles.TableButton>
            </td>
          </tr>
          <tr>
            <styles.CalendarIcon>
              <BsCalendarFill size="2rem" />
            </styles.CalendarIcon>
            <td>{moment(time).format('dddd, MMMM Do YYYY, h:mm a')}</td>
            <td>
              <styles.TableButton
                color="primary"
                type="button"
                onClick={addToGoogleCalendar}
              >
                Add to Calendar
              </styles.TableButton>
            </td>
          </tr>
        </tbody>
      </styles.OverviewTable>
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
    </styles.OverviewTableContainer>
  );
}
