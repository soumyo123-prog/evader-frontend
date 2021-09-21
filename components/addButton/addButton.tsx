import React, { PropsWithChildren } from 'react';
import { IoMdAdd } from 'react-icons/io';
import classes from './addButton.module.scss';

export default function AddEvent({
  clickHandler,
}: PropsWithChildren<{ clickHandler: () => void }>) {
  return (
    <button
      className={['btn btn-primary', classes.add_button].join(' ')}
      onClick={clickHandler}
      type="button"
    >
      <IoMdAdd size="1.5rem" color="white" />
    </button>
  );
}
