/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useRouter } from 'next/router';

import { toast, ToastContainer } from 'react-toastify';
import Compressor from 'compressorjs';
import { Label, Input, Button } from 'reactstrap';

import Validate from '../../utils/form-validator';
import AddEventService from '../../services/add-event-service';
import firebase from '../../context/firebase';

import { useAuth } from '../../context/auth';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

const storage = firebase.storage();
const db = firebase.firestore();

export default function AddEventForm() {
  const [disableSubmit, setdisableSubmit] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [venue, setVenue] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');
  const fileUploadRef = React.useRef<HTMLInputElement>(null);
  const { token } = useAuth();
  const router = useRouter();

  const changeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputName: string = e.target.value;
    const [result, error] = Validate.validateName(inputName);
    if (result) {
      setName(inputName);
      if (error === 'Name field is required!') {
        toast(error);
      }
    } else {
      toast(error);
    }
  };

  const changeDescriptionHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputDescription: string = e.target.value;
    const [result, error] = Validate.validateDescription(inputDescription);
    if (result) {
      setDescription(inputDescription);
    } else {
      toast(error);
    }
  };

  const changeVenueHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputVenue: string = e.target.value;
    const [result, error] = Validate.validateVenue(inputVenue);
    if (result) {
      setVenue(inputVenue);
      if (error === 'Venue field is required!') {
        toast(error);
      }
    } else {
      toast(error);
    }
  };

  const changeDateHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputDate: string = e.target.value;
    setDate(inputDate);
  };

  const changeTimeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputTime: string = e.target.value;
    setTime(inputTime);
  };

  const createEventHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const eventName = name;
    const eventDescription = description;
    const eventVenue = venue;
    const eventDateTime = new Date(date);
    eventDateTime.setHours(
      Number(time.split(':')[0]),
      Number(time.split(':')[1]),
      0
    );

    try {
      const dr = await db.collection('events').add({ name: eventName });
      const fireEventId = dr.id;

      await AddEventService(
        eventName,
        eventDescription,
        eventVenue,
        eventDateTime.toISOString(),
        fireEventId,
        token!
      );
      if (fileUploadRef.current!.files!.length > 0) {
        const storageRef = storage.ref().child(`events/${fireEventId}.png`);
        const file = fileUploadRef.current!.files![0];
        // eslint-disable-next-line no-new
        new Compressor(file, {
          quality: 0.8,
          success: async (result: File) => {
            await storageRef.put(result);
          },
          error: () => {},
        });
      }
    } catch (error: any) {
      toast(error.message);
    }
    router.replace('/events');
  };

  React.useEffect(() => {
    let valid: boolean = false;
    valid = Validate.isValid(name) && Validate.isValid(venue);

    if (date && time) {
      const dateTime = new Date(date);
      dateTime.setHours(
        Number(time.split(':')[0]),
        Number(time.split(':')[1]),
        0
      );
      valid = valid && Validate.isValidDateTime(dateTime);
    } else {
      valid = false;
    }

    if (valid) {
      setdisableSubmit(false);
    } else {
      setdisableSubmit(true);
    }
  }, [name, venue, date, time]);

  return (
    <>
      <styles.AddEventForm onSubmit={createEventHandler}>
        <styles.Heading>add event</styles.Heading>
        <styles.Group>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            onChange={changeNameHandler}
            value={name}
            data-testid="add-event-form-name-input"
          />
        </styles.Group>
        <styles.Group>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            id="description"
            onChange={changeDescriptionHandler}
            value={description}
            data-testid="add-event-form-description-input"
          />
        </styles.Group>
        <styles.Group>
          <Label for="venue">Venue</Label>
          <Input
            type="text"
            id="venue"
            onChange={changeVenueHandler}
            value={venue}
            data-testid="add-event-form-venue-input"
          />
        </styles.Group>
        <styles.Group>
          <Label for="date">Date</Label>
          <Input
            type="date"
            id="date"
            onChange={changeDateHandler}
            data-testid="add-event-form-date-input"
          />
        </styles.Group>
        <styles.Group>
          <Label for="time">Time</Label>
          <Input
            type="time"
            id="time"
            onChange={changeTimeHandler}
            data-testid="add-event-form-time-input"
          />
        </styles.Group>
        <styles.Group>
          <Label htmlFor="avatar" className={['form-label'].join(' ')}>
            Event Avatar
          </Label>
          <input
            className="form-control"
            type="file"
            id="avatar"
            ref={fileUploadRef}
            accept=".jpg, .jpeg, .png, .webp"
            data-testid="add-event-form-avatar-input"
          />
        </styles.Group>
        <Button
          type="submit"
          disabled={disableSubmit}
          data-testid="add-event-form-submit-button"
        >
          Create
        </Button>
      </styles.AddEventForm>
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
