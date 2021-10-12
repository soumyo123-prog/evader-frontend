import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';
import classes from './eventNavbar.module.scss';

const EventNavbarActive = loadable(() => import('./eventNavbarActive'));
const EventNavbarHamburger = loadable(() => import('./eventNavbarHamburger'));
const EventNavbarExpanded = loadable(() => import('./eventNavbarExpanded'));

export default function EventNavbar({
  active,
  fields,
  changeActive,
}: PropsWithChildren<{
  active: string;
  fields: string[];
  // eslint-disable-next-line no-unused-vars
  changeActive: (newActive: string) => void;
}>) {
  const [expand, setExpand] = React.useState<boolean>(false);

  const expandToggleHandler = () => {
    setExpand((prev) => !prev);
  };

  const expandOffHandler = () => {
    setExpand(false);
  };

  return (
    <>
      <nav className={[classes.event_navbar_container].join(' ')}>
        <ul className={['d-flex', classes.event_navbar].join(' ')}>
          <EventNavbarActive active={active} />
          <EventNavbarHamburger
            expandToggleHandler={expandToggleHandler}
            expandOffHandler={expandOffHandler}
          />
        </ul>
        <EventNavbarExpanded
          changeActive={changeActive}
          expand={expand}
          active={active}
          fields={fields}
        />
      </nav>
    </>
  );
}
