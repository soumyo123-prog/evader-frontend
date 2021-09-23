import React, { PropsWithChildren } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import classes from './addButton.module.scss';

export default function AddEvent({
  clickHandler,
  open,
}: PropsWithChildren<{ clickHandler: () => void; open: boolean }>) {
  return (
    <button
      className={['btn btn-dark', classes.add_button].join(' ')}
      onClick={clickHandler}
      type="button"
    >
      {open ? (
        <AiOutlineClose size="1.5rem" color="white" />
      ) : (
        <IoMdAdd size="1.5rem" color="white" />
      )}
    </button>
  );
}
