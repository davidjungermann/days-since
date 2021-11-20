import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../db/firestore';

const signUpUser = (auth, email, password) => {
  console.log(email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
};

const signInUser = (auth, email, password) => {
  console.log('Sign in!');
  signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
};

export { signUpUser, signInUser, signOutUser };
