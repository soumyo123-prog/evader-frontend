import firebase from '../context/firebase';

export default function authLogoutService() {
  return firebase.auth().signOut();
}
