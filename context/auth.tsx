import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import firebase, { User } from './firebase';
import axios from './axios';
import { userProfileType } from '../types/types';

declare let gapi: any;

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

  React.useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyBsLHhKI8t1pNuZZX4CSv5OMViFaJqrAtU',
        clientId:
          '473772422344-ef5e87udgtft9jqm72m87bhclio6nvg1.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar',
      });

      gapi.client.load('calendar', 'v3', () => {});
    });
  }, []);

  const signInHandler = async () => {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const authResponse = googleUser.getAuthResponse();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      authResponse.id_token,
      authResponse.access_token
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        const { user } = result;
        setFireUser(user);
      })
      .catch(() => {
        setErrorToast(true);
      });
  };

  const signOutHandler = async () => {
    await firebase.auth().signOut();
    setBackendUser({} as userProfileType);
    setFireUser(null);
    setToken(null);
    router.replace('/');
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
