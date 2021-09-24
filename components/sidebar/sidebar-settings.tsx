import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { IoIosSettings } from 'react-icons/io';
import classes from './sidebar.module.scss';

export default function SidebarSettings({
  expand,
  active,
}: PropsWithChildren<{ expand: boolean; active: string }>) {
  return (
    <Link href="/">
      <a
        className={[
          'd-flex align-items-center',
          classes.sidebar_link,
          `${
            active === 'settings' ? classes.sidebar_link_active : 'evader-dummy'
          }`,
        ].join(' ')}
      >
        <IoIosSettings
          size="1.5rem"
          style={{
            marginLeft: '28px',
            marginRight: '28px',
            marginTop: '13px',
            marginBottom: '13px',
          }}
        />
        {expand ? 'Settings' : ''}
      </a>
    </Link>
  );
}
