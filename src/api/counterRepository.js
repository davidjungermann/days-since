import { db } from '../db/firestore';
import { doc, collection, query, where, updateDoc, getDocs, addDoc } from 'firebase/firestore';
import { connectAuthEmulator } from '@firebase/auth';

const countersRef = collection(db, 'counters');

const createCounter = async (uid) => {
  await addDoc(collection(db, 'counters'), {
    value: 0,
    uid: uid,
  });
};

const getCounterValue = async (uid) => {
  console.log(uid);
  const q = query(countersRef, where('uid', '==', uid));
  const counters = await getDocs(q);
  return counters.docs[0].data().uid;
};

const setCounterValue = async (newValue) => {
  const counterRef = doc(db, 'counters', 'counter');
  await updateDoc(counterRef, {
    value: newValue,
  });
};

export { createCounter, getCounterValue, setCounterValue };
