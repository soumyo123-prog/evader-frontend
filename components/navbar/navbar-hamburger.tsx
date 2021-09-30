import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { useSidebar } from '../../context/sidebar';
import classes from './navbar.module.scss';

export default function NavbarHamburger() {
  const { expand, setExpand } = useSidebar();

  return (
    <button
      className={[classes.navbar_hamburger_button].join(' ')}
      type="button"
      onClick={() => setExpand((prev) => !prev)}
    >
      {expand ? (
        <AiOutlineClose size="1.5rem" color="white" />
      ) : (
        <GiHamburgerMenu color="white" size="1.5rem" />
      )}
    </button>
  );
}
