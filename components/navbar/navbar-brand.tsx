import React from 'react';
import Link from 'next/link';
import classes from './navbar.module.scss';

export default function NavbarBrand() {
  return (
    <Link href="/">
      <a className={[classes.navbar_brand].join(' ')}>Evader</a>
    </Link>
  );
}
