import React, { PropsWithChildren } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import classes from './eventNavbar.module.scss';

export default function EventNavbarHamburger({
  expandToggleHandler,
  expandOffHandler,
}: PropsWithChildren<{
  expandToggleHandler: () => void;
  expandOffHandler: () => void;
}>) {
  return (
    <li
      className={[
        'd-flex justify-content-center align-items-center',
        classes.event_navbar_item,
      ].join(' ')}
    >
      <button
        className={['btn btn-primary'].join(' ')}
        type="button"
        onClick={expandToggleHandler}
      >
        <IoIosArrowDropdown size="1.5rem" />
      </button>
    </li>
  );
}
