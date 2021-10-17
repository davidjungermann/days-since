import { signOut } from "firebase/auth";
import auth from "./db/firestore";

const signInUser = (email, password) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export default signOut;
