import { db } from '../db/firestore';
import {
  doc,
  collection,
  query,
  where,
  updateDoc,
  getDocs,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';

const countersRef = collection(db, 'counters');

const createCounter = async (uid) => {
  await addDoc(collection(db, 'counters'), {
    value: 0,
    uid: uid,
    streak: 0,
  });
};

const getCounter = async (uid) => {
  const q = query(countersRef, where('uid', '==', uid));
  const counters = await getDocs(q);
  return counters.docs[0];
};

const setCounterValue = async (newValue, id) => {
  const counterRef = doc(db, 'counters', id);
  await updateDoc(counterRef, {
    value: newValue,
  });
};

const getCounterListener = async (setCounter) => {
  const unsubscribe = onSnapshot(doc(db, 'counters', 'counter'), (doc) => {
    setCounter(doc.get('value'));
  });
  return unsubscribe;
};
export { createCounter, getCounter, setCounterValue, getCounterListener };
