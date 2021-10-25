import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { Table, Button } from 'reactstrap';

import { EventType } from '../../types/types';

import * as styles from './styles';
import Validate from '../../utils/form-validator';

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
    setName(e.target.value);
    modifyChanged(true);
  };

  const editTimeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    modifyChanged(true);
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
    <div>
      <Table>
        <thead>
          <tr>
            <styles.TH>Property</styles.TH>
            <styles.TH>Value</styles.TH>
          </tr>
        </thead>
        <tbody>
          <tr>
            <styles.TD>Name</styles.TD>
            <styles.TD>
              <styles.Input
                type="text"
                value={name}
                onChange={editNameHandler}
              />
            </styles.TD>
          </tr>
          <tr>
            <styles.TD>Description</styles.TD>
            <styles.TD>
              <styles.Textarea
                value={description}
                onChange={editDescriptionHandler}
              />
            </styles.TD>
          </tr>
          <tr>
            <styles.TD>Date</styles.TD>
            <styles.TD>
              <styles.Input
                type="date"
                value={date}
                onChange={editDateHandler}
              />
            </styles.TD>
          </tr>
          <tr>
            <styles.TD>Time</styles.TD>
            <styles.TD>
              <styles.Input
                type="time"
                value={time}
                onChange={editTimeHandler}
              />
            </styles.TD>
          </tr>
        </tbody>
      </Table>
      {changed && (
        <styles.Confirmation>
          <Button color="danger" outline onClick={cancelEditHandler}>
            Cancel
          </Button>
          <Button color="success" outline disabled={disabled}>
            Confirm
          </Button>
        </styles.Confirmation>
      )}
    </div>
  );
}
