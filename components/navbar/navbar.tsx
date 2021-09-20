import React from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import classes from './navbar.module.scss';
import { useSidebar } from '../../context/sidebar';

export default function Navbar() {
  const { setExpand } = useSidebar();

  return (
    <nav
      className={[
        'navbar navbar-dark bg-primary',
        classes.navbar_container,
      ].join(' ')}
    >
      <ul
        className={['d-flex align-items-center', classes.navbar_list].join(' ')}
      >
        <li
          className={[
            'd-flex justify-content-center align-items-center',
            classes.navbar_list_item,
            classes.navbar_list_hamburger_container,
          ].join(' ')}
        >
          <button
            className={[classes.navbar_hamburger_button].join(' ')}
            type="button"
            onClick={() => setExpand((prev) => !prev)}
          >
            <GiHamburgerMenu color="white" size="1.5rem" />
          </button>
        </li>
        <li
          className={[
            'd-flex justify-content-center align-items-center',
            classes.navbar_list_item,
          ].join(' ')}
        >
          <Link href="/">
            <a className={[classes.navbar_brand].join(' ')}>Evader</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
