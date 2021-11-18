import React, { PropsWithChildren } from 'react';

import TextField from '@mui/material/TextField';

import Validate from '../../utils/form-validator';

export default function VenueField({
  venue,
  setVenue,
}: PropsWithChildren<{
  venue: string;
  setVenue: React.Dispatch<React.SetStateAction<string>>;
}>) {
  const changeVenueHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputVenue: string = e.target.value;
    const [result, error] = Validate.validateVenue(inputVenue);
    if (result) {
      setVenue(inputVenue);
    }
  };

  return (
    <TextField
      required
      fullWidth
      id="eventVenue"
      label="Venue"
      name="eventVenue"
      value={venue}
      onChange={changeVenueHandler}
    />
  );
}
