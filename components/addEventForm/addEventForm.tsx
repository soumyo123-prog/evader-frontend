/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { toast, ToastContainer } from 'react-toastify';
import { Button, FormGroup, Input } from 'reactstrap';

import firebase from '../../context/firebase';
import Validate from '../../utils/form-validator';
import AddEventService from '../../services/add-event-service';

import { useAuth } from '../../context/auth';
import EventEmitterService from '../../services/event-emitter-service';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

const db = firebase.firestore();

export default function AddEventForm() {
  const [disableSubmit, setdisableSubmit] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [venue, setVenue] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');
  const [duration, setDuration] = React.useState<number>(1);
  const [unit, setUnit] = React.useState<number>(2);

  const { token } = useAuth();

  const nameErrorRef = React.useRef<HTMLDivElement>(null);
  const descriptionErrorRef = React.useRef<HTMLDivElement>(null);
  const venueErrorRef = React.useRef<HTMLDivElement>(null);

  const changeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    nameErrorRef!.current!.textContent! = '';
    const inputName: string = e.target.value;
    const [result, error] = Validate.validateName(inputName);
    if (result) {
      setName(inputName);
      if (error === 'Name field is required!') {
        nameErrorRef!.current!.textContent! = `* ${error}`;
      }
    } else {
      nameErrorRef.current!.textContent! = `* ${error}`;
    }
  };

  const changeDescriptionHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    (e) => {
      descriptionErrorRef.current!.textContent! = '';
      const inputDescription: string = e.target.value;
      const [result, error] = Validate.validateDescription(inputDescription);
      if (result) {
        setDescription(inputDescription);
      } else {
        descriptionErrorRef.current!.textContent! = `* ${error}`;
      }
    };

  const changeVenueHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    venueErrorRef.current!.textContent! = '';
    const inputVenue: string = e.target.value;
    const [result, error] = Validate.validateVenue(inputVenue);
    if (result) {
      setVenue(inputVenue);
      if (error === 'Venue field is required!') {
        venueErrorRef.current!.textContent! = `* ${error}`;
      }
    } else {
      venueErrorRef.current!.textContent! = `* ${error}`;
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

  const changeDurationHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputDuration: number = Number(e.target.value);
    setDuration(inputDuration);
  };

  const changeDurationUnitHandler: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setUnit(Number(e.target.value));
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
    let eventDuration = duration;
    if (unit <= 2) eventDuration *= 60 ** unit;
    else eventDuration *= 24 * 60 * 60;

    try {
      const dr = await db.collection('events').add({ name: eventName });
      const fireEventId = dr.id;

      await AddEventService(
        eventName,
        eventDescription,
        eventVenue,
        eventDateTime.toISOString(),
        eventDuration,
        fireEventId,
        token!
      );
      EventEmitterService('event_created', {});
    } catch (error: any) {
      toast.error(error.message);
    }
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
        <styles.LabelInput show={name} for="name">
          Name
        </styles.LabelInput>
        <input
          type="text"
          id="name"
          placeholder="Name"
          onChange={changeNameHandler}
          value={name}
          data-testid="add-event-form-name-input"
        />
        <div ref={nameErrorRef} />
        <styles.LabelInput show={description} for="description">
          Description
        </styles.LabelInput>
        <textarea
          id="description"
          placeholder="Description"
          onChange={changeDescriptionHandler}
          value={description}
          data-testid="add-event-form-description-input"
        />
        <div ref={descriptionErrorRef} />
        <styles.LabelInput show={venue} for="venue">
          Venue
        </styles.LabelInput>
        <input
          type="text"
          id="venue"
          placeholder="Venue"
          onChange={changeVenueHandler}
          value={venue}
          data-testid="add-event-form-venue-input"
        />
        <div ref={venueErrorRef} />
        <styles.LabelInput show for="date">
          Date
        </styles.LabelInput>
        <input
          type="date"
          id="date"
          onChange={changeDateHandler}
          data-testid="add-event-form-date-input"
        />
        <div />
        <styles.LabelInput show for="time">
          Time
        </styles.LabelInput>
        <input
          type="time"
          id="time"
          onChange={changeTimeHandler}
          data-testid="add-event-form-time-input"
        />
        <div />
        <FormGroup style={{ display: 'flex' }}>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={changeDurationHandler}
            min="1"
          />
          <Input
            type="select"
            placeholder="duration"
            value={unit}
            onChange={changeDurationUnitHandler}
          >
            <option value="1">Minutes</option>
            <option value="2">Hours</option>
            <option value="3">Days</option>
          </Input>
        </FormGroup>
        <div />
        <Button
          type="submit"
          color="primary"
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
