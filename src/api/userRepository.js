import { db } from '../db/firestore';
import { doc, setDoc } from 'firebase/firestore';

const createUser = async (user) => {
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    created: user.metadata.creationTime,
    lastSignIn: user.metadata.lastSignInTime,
  });
};

export { createUser };
