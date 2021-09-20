import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/auth';
import 'react-toastify/dist/ReactToastify.css';

import classes from './isNotAuth.module.scss';

export default function IsNotAuth() {
  const { errorToast, setErrorToast, signInHandler } = useAuth();

  React.useEffect(() => {
    if (errorToast) {
      toast('Error white authenticating!');
      setErrorToast(false);
    }
  }, [errorToast]);

  return (
    <div
      className={[
        'overflow-auto',
        'w-100 h-100',
        'd-flex flex-column align-items-center justify-content-center',
      ].join(' ')}
    >
      <div
        className={[
          classes.project_name,
          'text-uppercase',
          'user-select-none',
        ].join(' ')}
      >
        Evader
      </div>
      <div
        className={[
          classes.project_slogan,
          'text-capitalize',
          'user-select-none',
        ].join(' ')}
      >
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
