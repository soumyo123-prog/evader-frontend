import React from 'react';
import Navbar from '../navbar/navbar';
import Wrapper from '../../utils/sidebar-content-wrapper';
import Sidebar from '../sidebar/sidebar';

import classes from './events.module.scss';
import MainContentWrapper from '../../utils/main-content-wrapper';
import AddEvent from '../addButton/addButton';
import Backdrop from '../backdrop/backdrop';
import AddEventForm from '../addEventForm/addEventForm';

export default function Events() {
  const [show, setShow] = React.useState<boolean>(false);

  const addClickHandler = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <Sidebar />
        <MainContentWrapper>
          <AddEvent clickHandler={addClickHandler} />
        </MainContentWrapper>
      </Wrapper>
      <Backdrop show={show} clickHandler={addClickHandler} />
      <AddEventForm show={show} />
    </>
  );
}
