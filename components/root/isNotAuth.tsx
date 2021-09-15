import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '@/context/firebase';

import classes from './isNotAuth.module.scss';
import { useAuth } from '@/context/auth';

export default function IsNotAuth() {
  const { setFireUser } = useAuth();

  const signInHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        setFireUser(user);
      })
      .catch(() => {
        toast('Error while authenticating!');
      });
  };

  return (
    <div
      className={[
        'overflow-auto',
        'w-100 h-100',
        'd-flex flex-column align-items-center justify-content-center',
      ].join(' ')}
    >
      <div className={[classes.project_name, 'text-uppercase'].join(' ')}>
        Evader
      </div>
      <div className={[classes.project_slogan, 'text-capitalize'].join(' ')}>
        the all in one events management platform
      </div>
      <div className={['mt-4'].join(' ')}>
        <button
          className={['btn btn-primary'].join(' ')}
          onClick={signInHandler}
          type="button"
        >
          Authenticate
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
