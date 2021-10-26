/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PropsWithChildren } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from 'reactstrap';

import { useAuth } from '../../context/auth';
import invitePeople from '../../services/invite-people-service';
import Validate from '../../utils/form-validator';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

export default function EventInvitePeople({
  id,
}: PropsWithChildren<{ id: string }>) {
  const [email, setEmail] = React.useState<string>('');
  const { token } = useAuth();

  const changeEmailHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setEmail(e.target.value);
  };

  const invitePeopleHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const [result, error] = Validate.validateEmail(email);
    if (!result || error === 'Email field is required!') {
      toast.error(error);
    } else {
      try {
        await invitePeople(id, email, token!);
        toast.success('Invitation sent successfully');
      } catch (err: any) {
        toast.error(err.response.data.error);
      }
    }
  };

  return (
    <>
      <styles.InviteForm onSubmit={invitePeopleHandler}>
        <styles.LabelInput show={email} for="email" className="form-label">
          Email Address
        </styles.LabelInput>
        <styles.Input
          type="text"
          id="email"
          placeholder="Email Address"
          onChange={changeEmailHandler}
          value={email}
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </styles.InviteForm>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
