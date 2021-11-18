import React, { PropsWithChildren } from 'react';

import moment from 'moment';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';

export default function TimeField({
  time,
  setTime,
}: PropsWithChildren<{
  time: moment.Moment;
  setTime: React.Dispatch<React.SetStateAction<moment.Moment>>;
}>) {
  const changeTimeHandler = (newValue: any) => {
    setTime(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <TimePicker
        label="Time"
        value={time}
        onChange={(newValue) => changeTimeHandler(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
