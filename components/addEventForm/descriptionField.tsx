import { TextField } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import Validate from '../../utils/form-validator';

export default function DescriptionField({
  description,
  setDescription,
}: PropsWithChildren<{
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}>) {
  const changeDescriptionHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputDescription: string = e.target.value;
    const [result, error] = Validate.validateDescription(inputDescription);
    if (result) {
      setDescription(inputDescription);
    }
  };

  return (
    <TextField
      name="eventDescription"
      fullWidth
      id="eventDescription"
      label="Description"
      value={description}
      onChange={changeDescriptionHandler}
    />
  );
}
