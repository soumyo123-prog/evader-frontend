import React, { PropsWithChildren } from 'react';
import classes from './eventNavbar.module.scss';

export default function EventNavbarActive({
  active,
}: PropsWithChildren<{ active: string }>) {
  return (
    <li
      className={[
        'd-flex justify-content-center align-items-center',
        'text-uppercase',
        'text-primary',
        'ms-auto me-auto',
        classes.event_navbar_item,
        classes.event_navbar_state,
      ].join(' ')}
    >
      {active}
    </li>
  );
}
