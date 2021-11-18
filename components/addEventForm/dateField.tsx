import React, { PropsWithChildren } from 'react';
import moment from 'moment';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

export default function DateField({
  date,
  setDate,
}: PropsWithChildren<{
  date: moment.Moment;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}>) {
  const changeDateHandler = (newValue: any) => {
    setDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label="Date"
        value={date}
        onChange={(newValue) => changeDateHandler(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
