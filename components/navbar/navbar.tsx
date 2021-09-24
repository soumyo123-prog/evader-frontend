import React from 'react';
import loadable from '@loadable/component';
import { GiHamburgerMenu } from 'react-icons/gi';
import classes from './navbar.module.scss';
import { useAuth } from '../../context/auth';

const NavbarHamburger = loadable(() => import('./navbar-hamburger'));
const NavbarBrand = loadable(() => import('./navbar-brand'));

export default function Navbar() {
  const { token } = useAuth();
  return (
    <nav
      className={[
        `${!token ? 'd-none' : 'evader-dummy'}`,
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
          <NavbarHamburger
            fallback={<GiHamburgerMenu color="white" size="1.5rem" />}
          />
        </li>
        <li
          className={[
            'd-flex justify-content-center align-items-center',
            classes.navbar_list_item,
          ].join(' ')}
        >
          <NavbarBrand fallback={<div> Evader </div>} />
        </li>
      </ul>
    </nav>
  );
}
