import React, { PropsWithChildren } from 'react';
import loadable from '@loadable/component';

import classes from './eventsNavbar.module.scss';

const NavbarDropdown = loadable(() => import('./eventsNavbarDropdown'));

export default function EventsNavbar({
  filter,
  choosen,
  changeFilterHandler,
  clickHandler,
}: PropsWithChildren<{
  filter: string;
  choosen: string;
  // eslint-disable-next-line no-unused-vars
  clickHandler: (val: string) => void;
  // eslint-disable-next-line no-unused-vars
  changeFilterHandler: (val: string) => void;
}>) {
  return (
    <>
      <nav className={['d-flex justify-content-center'].join(' ')}>
        <ul
          className={[
            'd-flex justify-content-center',
            classes.event_navbar,
            `${
              choosen === 'Created'
                ? classes.event_navbar_left
                : classes.event_navbar_right
            }`,
          ].join(' ')}
        >
          <li
            className={[
              'd-flex align-items-center justify-content-center',
              classes.event_navbar_item,
              `${
                choosen === 'Created'
                  ? classes.event_navbar_item_active
                  : 'evader-dummy'
              }`,
            ].join(' ')}
          >
            <button
              className={['btn'].join(' ')}
              type="button"
              onClick={() => clickHandler('Created')}
            >
              Created
            </button>
          </li>
          <li
            className={[
              'd-flex align-items-center justify-content-center',
              classes.event_navbar_item,
              `${
                choosen === 'Invited'
                  ? classes.event_navbar_item_active
                  : 'evader-dummy'
              }`,
            ].join(' ')}
          >
            <button
              className={['btn'].join(' ')}
              type="button"
              onClick={() => clickHandler('Invited')}
            >
              Invited
            </button>
          </li>
        </ul>
      </nav>
      <NavbarDropdown
        filter={filter}
        changeFilterHandler={changeFilterHandler}
      />
    </>
  );
}
