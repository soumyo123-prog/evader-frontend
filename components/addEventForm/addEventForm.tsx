/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PropsWithChildren } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import classes from './addEventForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import Validate from '../../utils/form-validator';
import AddEventService from '../../services/add-event-service';
import { useAuth } from '../../context/auth';

export default function AddEventForm({
  show,
}: PropsWithChildren<{ show: boolean }>) {
  const [disableSubmit, setdisableSubmit] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [venue, setVenue] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');
  const { token } = useAuth();

  const reset = () => {
    setName('');
    setDescription('');
    setVenue('');
    setDate('');
    setTime('');
  };

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

  const changeDescriptionHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    (e) => {
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
    const inputYear = inputDate.substring(0, 4);
    const [result, error] = Validate.validateDate(inputYear);
    if (result) {
      setDate(inputDate);
    } else {
      toast(error);
    }
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
    const eventPhotoUrl = 'https://www.w3.org/Provider/Style/dummy.html';
    const res = await AddEventService(
      eventName,
      eventDescription,
      eventVenue,
      eventDateTime.toISOString(),
      eventPhotoUrl,
      token!
    ).catch((error) => {
      toast(error.message);
    });
    toast('Event added successfully!');
    reset();
  };

  React.useEffect(() => {
    let valid: boolean = false;
    valid =
      Validate.isValid(name) &&
      Validate.isValid(venue) &&
      Validate.isValid(date) &&
      Validate.isValid(time);
    if (valid) {
      setdisableSubmit(false);
    } else {
      setdisableSubmit(true);
    }
  }, [name, venue, date, time]);

  const formClasses = [
    'd-flex flex-column align-items-center justify-content-center',
    'text-light',
    classes.add_event_form,
  ];

  if (show) {
    formClasses.push(classes.open);
  } else {
    formClasses.push(classes.close);
  }

  return (
    <>
      <form className={formClasses.join(' ')} onSubmit={createEventHandler}>
        <p className={['h1 text-uppercase'].join(' ')}> add event </p>
        <div className="mb-3">
          <label htmlFor="name" className={['form-label'].join(' ')}>
            Name
          </label>
          <input
            type="text"
            className={['form-control'].join(' ')}
            id="name"
            onChange={changeNameHandler}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className={['form-label'].join(' ')}>
            Description
          </label>
          <textarea
            className={['form-control'].join(' ')}
            id="description"
            onChange={changeDescriptionHandler}
            value={description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="venue" className={['form-label'].join(' ')}>
            Venue
          </label>
          <input
            type="text"
            className={['form-control'].join(' ')}
            id="venue"
            onChange={changeVenueHandler}
            value={venue}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className={['form-label'].join(' ')}>
            Date
          </label>
          <input
            type="date"
            className={['form-control'].join(' ')}
            id="date"
            onChange={changeDateHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className={['form-label'].join(' ')}>
            Time
          </label>
          <input
            type="time"
            className={['form-control'].join(' ')}
            id="time"
            onChange={changeTimeHandler}
          />
        </div>
        <button
          className={['btn btn-success'].join(' ')}
          type="submit"
          disabled={disableSubmit}
        >
          Create
        </button>
      </form>
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
