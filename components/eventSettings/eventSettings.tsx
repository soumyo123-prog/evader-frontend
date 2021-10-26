import React, { PropsWithChildren } from 'react';

import moment from 'moment';
import { Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';

import { EventType } from '../../types/types';
import { useAuth } from '../../context/auth';
import SaveEventSettingsService from '../../services/save-event-settings-service';
import Validate from '../../utils/form-validator';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

export default function EventSettings({
  id,
  fetchedEvent,
}: PropsWithChildren<{ id: string; fetchedEvent: EventType }>) {
  const [changed, setChanged] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [name, setName] = React.useState(fetchedEvent.name);
  const [description, setDescription] = React.useState(
    fetchedEvent.description
  );
  const [date, setDate] = React.useState(
    moment(fetchedEvent.time).format('YYYY-MM-DD')
  );
  const [time, setTime] = React.useState(
    moment(fetchedEvent.time).format('hh:mm')
  );

  const { token } = useAuth();

  const modifyChanged = (val: boolean) => {
    if (changed && !val) {
      setChanged(val);
    }

    if (!changed && val) {
      setChanged(val);
    }
  };

  const cancelEditHandler = () => {
    setName(fetchedEvent.name);
    setDescription(fetchedEvent.description);
    setDate(moment(fetchedEvent.time).format('YYYY-MM-DD'));
    setTime(moment(fetchedEvent.time).format('hh:mm'));
    modifyChanged(false);
  };

  const editNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    modifyChanged(true);
  };

  const editDescriptionHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    (e) => {
      setDescription(e.target.value);
      modifyChanged(true);
    };

  const editDateHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDate(e.target.value);
    modifyChanged(true);
  };

  const editTimeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTime(e.target.value);
    modifyChanged(true);
  };

  const sumbitSettingsHandler: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const eventDateTime = new Date(date);
    eventDateTime.setHours(
      Number(time.split(':')[0]),
      Number(time.split(':')[1]),
      0
    );

    const modifiedData = {
      name,
      description,
      time: eventDateTime,
    };

    try {
      await SaveEventSettingsService(id, token!, modifiedData);
      toast.success('Event settings saved successfully!');
    } catch (err: any) {
      toast.error('Something went wrong!');
    }
  };

  React.useEffect(() => {
    let valid: boolean = false;
    valid = Validate.isValid(name);

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
    setDisabled(!valid);
  }, [name, date, time]);

  return (
    <>
      <styles.Form>
        <styles.LabelInput show={name} for="name">
          Name
        </styles.LabelInput>
        <styles.Input
          type="text"
          id="name"
          value={name}
          onChange={editNameHandler}
          placeholder="Name"
        />

        <styles.LabelInput show={description} for="description">
          Description
        </styles.LabelInput>
        <styles.Textarea
          id="description"
          value={description}
          onChange={editDescriptionHandler}
          placeholder="Description"
        />

        <styles.LabelInput show={date} for="date">
          Date
        </styles.LabelInput>
        <styles.Input
          type="date"
          id="date"
          value={date}
          onChange={editDateHandler}
        />

        <styles.LabelInput show={time} for="time">
          Time
        </styles.LabelInput>
        <styles.Input
          type="time"
          id="time"
          value={time}
          onChange={editTimeHandler}
        />

        {changed && (
          <styles.Confirmation>
            <Button
              type="button"
              color="danger"
              outline
              onClick={cancelEditHandler}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="success"
              outline
              disabled={disabled}
              onClick={sumbitSettingsHandler}
            >
              Confirm
            </Button>
          </styles.Confirmation>
        )}
      </styles.Form>
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
