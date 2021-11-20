import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const signUpUser = (auth, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      return response.user.uid;
    })
    // TODO: Implement error handling
    .catch((error) => {
      console.log(error.code, error.message);
    });
};

const signInUser = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      return response.user.uid;
    })
    .catch((error) => {
      // TODO: Implement error handling
      console.log(error.code, error.message);
    });
};

const signOutUser = (auth) => {
  signOut(auth)
    .then(() => {})
    // TODO: Implement error handling
    .catch((error) => {});
};

export { signUpUser, signInUser, signOutUser };
