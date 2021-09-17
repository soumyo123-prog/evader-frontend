import React, { PropsWithChildren } from 'react';
import firebase, { User } from './firebase';
import axiosInstance from './axios';

export const AuthContext = React.createContext<{
  fireUser: User | null;
  errorToast: boolean;
  token: string | null;
  signInHandler: () => void;
  setFireUser: React.Dispatch<React.SetStateAction<User | null>>;
  setErrorToast: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  fireUser: null,
  errorToast: false,
  token: null,
  signInHandler: () => {},
  setFireUser: () => {},
  setErrorToast: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [fireUser, setFireUser] = React.useState<User | null>(null);
  const [errorToast, setErrorToast] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
        user
          .getIdToken(true)
          .then((idToken) => {
            axiosInstance
              .post<{ token: string }>('auth/login/', {
                id_token: idToken,
              })
              .then((response) => {
                console.log(response.data);
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
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
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
        signInHandler,
        setFireUser,
        setErrorToast,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
