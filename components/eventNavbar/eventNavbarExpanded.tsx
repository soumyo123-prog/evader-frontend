/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PropsWithChildren } from 'react';
import classes from './eventNavbar.module.scss';
import EventNavbarExpandedItem from './eventNavbarExpandedItem';

export default function EventNavbarExpanded({
  expand,
  active,
  fields,
  changeActive,
}: PropsWithChildren<{
  expand: boolean;
  active: string;
  fields: string[];
  // eslint-disable-next-line no-unused-vars
  changeActive: (newActive: string) => void;
}>) {
  const notActive = fields.filter((field) => field !== active);

  return (
    <div
      className={[
        'd-flex flex-column align-items-center',
        classes.navbar_expanded,
        `${
          expand ? classes.navbar_expanded_open : classes.navbar_expanded_close
        }`,
      ].join(' ')}
    >
      {notActive.map((field, index) => (
        <EventNavbarExpandedItem
          changeActive={changeActive}
          field={field}
          key={index}
        />
      ))}
    </div>
  );
}
