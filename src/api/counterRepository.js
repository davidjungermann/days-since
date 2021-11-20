import { db } from '../db/firestore';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const getCounterValue = async () => {
  const counterRef = doc(db, 'counters', 'counter');
  const counterDoc = await getDoc(counterRef);
  return counterDoc.get('value');
};

const setCounterValue = async (newValue) => {
  const counterRef = doc(db, 'counters', 'counter');
  await updateDoc(counterRef, {
    value: newValue,
  });
};

export { getCounterValue, setCounterValue };
