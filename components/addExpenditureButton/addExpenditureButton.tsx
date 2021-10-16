import React, { PropsWithChildren } from 'react';
import { IoMdAdd } from 'react-icons/io';
import classes from './addExpenditureButton.module.scss';

export default function AddExpenditureButton({
  clickHandler,
  open,
}: PropsWithChildren<{ clickHandler: () => void; open: boolean }>) {
  return (
    <button
      className={['btn btn-primary', classes.add_button].join(' ')}
      onClick={clickHandler}
      type="button"
    >
      <IoMdAdd
        className={[
          classes.add_button_icon,
          `${
            open
              ? classes.add_button_icon_rotate
              : classes.add_button_icon_no_rotate
          }`,
        ].join(' ')}
        color="white"
        size="1.5rem"
      />{' '}
    </button>
  );
}
