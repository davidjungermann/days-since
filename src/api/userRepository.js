import { db } from '../db/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const createUser = async (user) => {
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    created: user.metadata.creationTime,
    lastSignIn: user.metadata.lastSignInTime,
    support: false,
    agile: false,
    counter: true,
  });
};

const getUser = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const user = await getDoc(userRef);
  return user.data();
};

export { createUser, getUser };
