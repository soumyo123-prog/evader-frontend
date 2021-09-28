import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import classes from './eventNavbar.module.scss';

export default function EventNavbar() {
  return (
    <nav className={[classes.event_navbar_container].join(' ')}>
      <ul className={['d-flex', classes.event_navbar].join(' ')}>
        <li
          className={[
            'd-flex justify-content-center align-items-center',
            'text-uppercase',
            'text-primary',
            classes.event_navbar_item,
            classes.event_navbar_state,
          ].join(' ')}
        >
          Overview
        </li>
        <li
          className={[
            'd-flex justify-content-center align-items-center',
            'ms-auto',
            classes.event_navbar_item,
          ].join(' ')}
        >
          <button
            className={[classes.navbar_toggler_icon].join(' ')}
            type="button"
          >
            <GiHamburgerMenu size="1.5rem" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
