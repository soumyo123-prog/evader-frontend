import React, { PropsWithChildren } from 'react';
import firebase, { User } from './firebase';
import axios from './axios';
import { userProfileType } from '@/types/types';
import authLoginService from '@/services/auth-login-service';

export const AuthContext = React.createContext<{
  fireUser: User | null;
  errorToast: boolean;
  token: string | null;
  backendUser: userProfileType;
  signInHandler: () => void;
  setFireUser: React.Dispatch<React.SetStateAction<User | null>>;
  setErrorToast: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setBackendUser: React.Dispatch<React.SetStateAction<userProfileType>>;
}>({
  fireUser: null,
  errorToast: false,
  token: null,
  backendUser: {} as userProfileType,
  signInHandler: () => {},
  setFireUser: () => {},
  setErrorToast: () => {},
  setToken: () => {},
  setBackendUser: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [fireUser, setFireUser] = React.useState<User | null>(null);
  const [errorToast, setErrorToast] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [backendUser, setBackendUser] = React.useState<userProfileType>(
    {} as userProfileType
  );

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
        user
          .getIdToken(true)
          .then((idToken) => {
            axios
              .post<{ token: string }>('auth/login/', {
                id_token: idToken,
              })
              .then((response) => {
                setToken(response.data.token);
              })
              .catch(() => {
                setToken(null);
                setErrorToast(true);
              });
          })
          .catch(() => {
            setErrorToast(true);
          });
      }
    });
  }, [fireUser]);

  const signInHandler = () => {
    authLoginService()
      .then((result) => {
        const { user } = result;
        setFireUser(user);
      })
      .catch(() => {
        setErrorToast(true);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        fireUser,
        errorToast,
        token,
        backendUser,
        signInHandler,
        setFireUser,
        setErrorToast,
        setToken,
        setBackendUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
