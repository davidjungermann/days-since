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
  });
};

const getCounterValue = async (uid) => {
  const q = query(countersRef, where('uid', '==', uid));
  const counters = await getDocs(q);
  const value = counters.docs[0].data().value;
  return value;
};

const setCounterValue = async (newValue) => {
  const counterRef = doc(db, 'counters', 'counter');
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
export { createCounter, getCounterValue, setCounterValue, getCounterListener };
