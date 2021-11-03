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
  venue,
}: PropsWithChildren<{ time: string; venue: string }>) {
  const addToGoogleCalendar = () => {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: 'AIzaSyBsLHhKI8t1pNuZZX4CSv5OMViFaJqrAtU',
        clientId:
          '473772422344-ef5e87udgtft9jqm72m87bhclio6nvg1.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scopes: 'https://www.googleapis.com/auth/calendar',
      });

      // gapi.client.load('calendar', 'v3', async () => {
      //   console.log('calendar loaded');
      //   try {
      //     const insert = await gapi.client.calendar.events.insert({
      //       calendarId: 'primary',
      //       summary: 'Evader',
      //       location: venue,
      //       description: 'Evader',
      //       start: {
      //         dateTime: moment(time, 'YYYY-MM-DD HH:mm:ss').toISOString(),
      //         timeZone: 'Asia/Kolkata',
      //       },
      //       end: {
      //         dateTime: moment(time, 'YYYY-MM-DD HH:mm:ss').toISOString(),
      //         timeZone: 'Asia/Kolkata',
      //       },
      //     });
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });
    });
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
