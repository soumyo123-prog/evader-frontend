import React, { PropsWithChildren } from 'react';
import { IoMdAdd } from 'react-icons/io';
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
      <IoMdAdd
        className={[
          classes.add_button_icon,
          `${
            open
              ? classes.add_button_icon_pos_rot
              : classes.add_button_icon_neg_rot
          }`,
        ].join(' ')}
        size="1.5rem"
        color="white"
        data-testid="add-event-open-icon"
      />
    </button>
  );
}
