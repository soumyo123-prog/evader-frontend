import loadable from '@loadable/component';
import { useRouter } from 'next/router';
import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { useAuth } from '../../context/auth';
import MainContentWrapper from '../../utils/main-content-wrapper';
import Redirect from '../../utils/redirector';
import Wrapper from '../../utils/sidebar-content-wrapper';

const AddEventForm = loadable(
  () => import('../../components/addEventForm/addEventForm')
);
const AddEventButton = loadable(
  () => import('../../components/addButton/addButton')
);

export default function CreateForm() {
  const { token } = useAuth();
  const router = useRouter();

  const addClickHandler = () => {
    router.replace('/events');
  };

  let content = <Redirect to="/" />;
  if (token) {
    content = (
      <>
        <Wrapper>
          <Sidebar />
          <MainContentWrapper>
            <AddEventButton clickHandler={addClickHandler} open />
            <AddEventForm />
          </MainContentWrapper>
        </Wrapper>
      </>
    );
  }
  return content;
}
