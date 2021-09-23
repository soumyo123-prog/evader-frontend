import React from 'react';
import Navbar from '../navbar/navbar';
import Wrapper from '../../utils/sidebar-content-wrapper';
import Sidebar from '../sidebar/sidebar';

import MainContentWrapper from '../../utils/main-content-wrapper';
import AddEvent from '../addButton/addButton';
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
          <AddEventForm show={show} />
          <AddEvent clickHandler={addClickHandler} open={show} />
        </MainContentWrapper>
      </Wrapper>
    </>
  );
}
