import React from 'react';

import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useAuth } from '../../context/auth';
import firebase from '../../context/firebase';
import AddEventService from '../../services/add-event-service';
import EventEmitterService from '../../services/event-emitter-service';

import NameField from './nameField';
import DescriptionField from './descriptionField';
import VenueField from './venueField';

import 'react-toastify/dist/ReactToastify.css';
import DateField from './dateField';
import TimeField from './timeField';
import DurationField from './durationField';

const db = firebase.firestore();

export default function AddEventForm() {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [venue, setVenue] = React.useState('');
  const [dateTime, setDateTime] = React.useState(moment());
  const [duration, setDuration] = React.useState(1);
  const [unit, setUnit] = React.useState(2);

  const { token } = useAuth();

  // const createEventHandler: React.FormEventHandler<HTMLFormElement> = async (
  //   e
  // ) => {
  //   e.preventDefault();

  //   const eventName = name;
  //   const eventDescription = description;
  //   const eventVenue = venue;
  //   const eventDateTime = new Date(date);
  //   eventDateTime.setHours(
  //     Number(time.split(':')[0]),
  //     Number(time.split(':')[1]),
  //     0
  //   );
  //   let eventDuration = duration;
  //   if (unit <= 2) eventDuration *= 60 ** unit;
  //   else eventDuration *= 24 * 60 * 60;

  //   try {
  //     const dr = await db.collection('events').add({ name: eventName });
  //     const fireEventId = dr.id;

  //     await AddEventService(
  //       eventName,
  //       eventDescription,
  //       eventVenue,
  //       eventDateTime.toISOString(),
  //       eventDuration,
  //       fireEventId,
  //       token!
  //     );
  //     EventEmitterService('event_created', {});
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Event Details
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <NameField name={name} setName={setName} />
              </Grid>
              <Grid item xs={12}>
                <DescriptionField
                  description={description}
                  setDescription={setDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <VenueField venue={venue} setVenue={setVenue} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateField date={dateTime} setDate={setDateTime} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimeField time={dateTime} setTime={setDateTime} />
              </Grid>
              <Grid item xs={12}>
                <DurationField
                  duration={duration}
                  setDuration={setDuration}
                  unit={unit}
                  setUnit={setUnit}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      </Container>
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
