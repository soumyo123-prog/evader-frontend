import React from 'react';
import IsAuth from '../components/root/isAuth';
import IsNotAuth from '../components/root/isNotAuth';
import type { User } from '../context/firebase';
import firebase from '../context/firebase';

const Home = () => {
  const [fireUser, setFireUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFireUser(user);
      } else {
        setFireUser(null);
      }
    });

    return () => unsubscribe();
  });

  if (fireUser) {
    return <IsAuth />;
  }
  return <IsNotAuth />;
};

export default Home;
