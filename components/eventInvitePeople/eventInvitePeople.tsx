/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PropsWithChildren } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/auth';
import invitePeople from '../../services/invite-people-service';
import Validate from '../../utils/form-validator';

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
      toast(error);
    } else {
      try {
        await invitePeople(id, email, token!);
        toast('Invitation sent successfully');
      } catch (err: any) {
        toast(err.response.data.error);
      }
    }
  };

  return (
    <>
      <form
        className={[
          'd-flex flex-column justify-content-center align-items-center',
          'mt-5 p-5',
        ].join(' ')}
        onSubmit={invitePeopleHandler}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={changeEmailHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
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
