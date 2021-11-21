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

const getCounter = async (uid, type) => {
  const q = query(countersRef, where('uid', '==', uid));
  const counters = await getDocs(q);
  if (type === 'value') {
    return counters.docs[0].data().value;
  } else if (type === 'ref') {
    return counters.docs[0].id;
  }
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
