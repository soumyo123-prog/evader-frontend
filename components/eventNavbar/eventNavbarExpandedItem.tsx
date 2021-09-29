/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PropsWithChildren } from 'react';
import classes from './eventNavbar.module.scss';

export default function EventNavbarExpandedItem({
  changeActive,
  field,
}: PropsWithChildren<{
  // eslint-disable-next-line no-unused-vars
  changeActive: (newActive: string) => void;
  field: string;
}>) {
  return (
    <div
      className={[
        'd-flex justify-content-center align-items-center',
        'text-uppercase text-primary',
        classes.hidden_menu_item,
      ].join(' ')}
    >
      <a
        className={['btn btn-primary'].join(' ')}
        role="button"
        onClick={() => changeActive(field)}
      >
        {field}
      </a>
    </div>
  );
}
