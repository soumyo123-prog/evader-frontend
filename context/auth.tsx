import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import firebase, { User } from './firebase';
import axios from './axios';
import { userProfileType } from '../types/types';
import authLoginService from '../services/auth-login-service';
import authLogoutService from '../services/auth-logout-service';

export const AuthContext = React.createContext<{
  fireUser: User | null;
  errorToast: boolean;
  loading: boolean;
  token: string | null;
  backendUser: userProfileType;
  signInHandler: () => void;
  signOutHandler: () => void;
  setFireUser: React.Dispatch<React.SetStateAction<User | null>>;
  setErrorToast: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setBackendUser: React.Dispatch<React.SetStateAction<userProfileType>>;
}>({
  fireUser: null,
  errorToast: false,
  loading: false,
  token: null,
  backendUser: {} as userProfileType,
  signInHandler: () => {},
  signOutHandler: () => {},
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);
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
                setLoading(false);
                setToken(response.data.token);
              })
              .catch(() => {
                setLoading(false);
                setToken(null);
                setErrorToast(true);
              });
          })
          .catch(() => {
            setLoading(false);
            setErrorToast(true);
          });
      } else {
        setLoading(false);
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

  const signOutHandler = () => {
    authLogoutService().then(() => {
      setBackendUser({} as userProfileType);
      setFireUser(null);
      setToken(null);
      router.replace('/');
    });
  };

  return (
    <AuthContext.Provider
      value={{
        fireUser,
        errorToast,
        loading,
        token,
        backendUser,
        signInHandler,
        signOutHandler,
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
