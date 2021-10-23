import React, { PropsWithChildren } from 'react';
import loadable from '@loadable/component';

import * as styles from './styles';

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

  return (
    <>
      <styles.EventNavbarContainer>
        <ul>
          <EventNavbarActive active={active} />
          <EventNavbarHamburger
            expand={expand}
            expandToggleHandler={expandToggleHandler}
          />
        </ul>
        <EventNavbarExpanded
          changeActive={changeActive}
          expand={expand}
          active={active}
          fields={fields}
        />
      </styles.EventNavbarContainer>
    </>
  );
}
