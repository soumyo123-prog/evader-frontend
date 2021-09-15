import React, { PropsWithChildren } from 'react';
import firebase, { User } from './firebase';

export const AuthContext = React.createContext<{
  fireUser: User | null;
  setFireUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  fireUser: null,
  setFireUser: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [fireUser, setFireUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
      } else {
        setFireUser(null);
      }
    });
  }, []);

  // React.useEffect(() => {
  //   if (fireUser) {
  //   }
  // }, [fireUser]);

  return (
    <AuthContext.Provider
      value={{
        fireUser,
        setFireUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
