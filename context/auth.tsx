import React, { PropsWithChildren } from 'react';
import firebase, { User } from './firebase';

export const AuthContext = React.createContext<{
  fireUser: User | null;
  errorToast: boolean;
  signInHandler: () => void;
  setFireUser: React.Dispatch<React.SetStateAction<User | null>>;
  setErrorToast: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  fireUser: null,
  errorToast: false,
  signInHandler: () => {},
  setFireUser: () => {},
  setErrorToast: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [fireUser, setFireUser] = React.useState<User | null>(null);
  const [errorToast, setErrorToast] = React.useState<boolean>(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
        user
          .getIdToken(true)
          .then((idToken) => {
            console.log(idToken);
          })
          .catch(() => {
            setErrorToast(true);
          });
      }
    });
  }, []);

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
        signInHandler,
        setFireUser,
        setErrorToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
