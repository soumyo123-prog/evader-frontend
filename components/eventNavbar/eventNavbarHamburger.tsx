import React, { PropsWithChildren } from 'react';

import { IoIosArrowDropdown } from 'react-icons/io';
import { Button } from 'reactstrap';

import * as styles from './styles';

export default function EventNavbarHamburger({
  expand,
  expandToggleHandler,
}: PropsWithChildren<{
  expand: boolean;
  expandToggleHandler: () => void;
}>) {
  return (
    <styles.Hamburger expand={expand}>
      <Button color="primary" type="button" onClick={expandToggleHandler}>
        <IoIosArrowDropdown size="1.5rem" />
      </Button>
    </styles.Hamburger>
  );
}
