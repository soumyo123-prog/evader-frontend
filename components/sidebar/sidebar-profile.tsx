import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { IoPerson } from 'react-icons/io5';
import classes from './sidebar.module.scss';

export default function SidebarProfile({
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
            active === 'profile' ? classes.sidebar_link_active : 'evader-dummy'
          }`,
        ].join(' ')}
      >
        <IoPerson
          size="1.5rem"
          style={{
            marginLeft: '28px',
            marginRight: '28px',
            marginTop: '13px',
            marginBottom: '13px',
          }}
        />
        {expand ? 'Profile' : ''}
      </a>
    </Link>
  );
}
