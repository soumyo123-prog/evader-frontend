import React from 'react';
import { Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';

import { useAuth } from '../../context/auth';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

export default function IsNotAuth() {
  const { errorToast, setErrorToast, signInHandler } = useAuth();

  React.useEffect(() => {
    if (errorToast) {
      toast.error('Error white authenticating!');
      setErrorToast(false);
    }
  }, [errorToast]);

  return (
    <styles.IsNotAuthContainer>
      <styles.ProjectDetailsContainer>
        <styles.ProjectName> Evader </styles.ProjectName>
        <styles.ProjectSlogan>
          the all in one events management platform
        </styles.ProjectSlogan>
        <styles.ButtonContainer>
          <Button color="primary" onClick={signInHandler} type="button">
            Authenticate
          </Button>
        </styles.ButtonContainer>
      </styles.ProjectDetailsContainer>
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
    </styles.IsNotAuthContainer>
  );
}
