import firebase from '../context/firebase';

export default function authLoginService() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}
