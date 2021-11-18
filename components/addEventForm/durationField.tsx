import React, { PropsWithChildren } from 'react';

import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function DurationField({
  duration,
  unit,
  setDuration,
  setUnit,
}: PropsWithChildren<{
  duration: number;
  unit: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setUnit: React.Dispatch<React.SetStateAction<number>>;
}>) {
  const changeDurationHandler = (e: any) => {
    const inputDuration = Number(e.target.value);
    if (inputDuration >= 1) setDuration(inputDuration);
  };

  const changeUnitHandler = (e: any) => {
    setUnit(Number(e.target.value));
  };

  return (
    <>
      <TextField
        required
        label="Duration"
        id="eventDuration"
        name="eventDuration"
        type="number"
        value={duration}
        onChange={changeDurationHandler}
      />
      <FormControl>
        <InputLabel id="eventUnit">Unit</InputLabel>
        <Select
          labelId="eventUnit"
          id="demo-simple-select"
          value={unit}
          label="Unit"
          onChange={changeUnitHandler}
        >
          <MenuItem value={1}>Minutes</MenuItem>
          <MenuItem value={2}>Hours</MenuItem>
          <MenuItem value={3}>Days</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
