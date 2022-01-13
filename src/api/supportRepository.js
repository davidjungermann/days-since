import { db } from '../db/firestore';
import { doc, collection, getDoc } from 'firebase/firestore';

const supportRef = doc(db, 'support', 'current');

const getBatman = async () => {
  const support = await getDoc(supportRef);
  return support.data().batman;
};

const getRobin = async () => {
  const support = await getDoc(supportRef);
  return support.data().robin;
};

export { getBatman, getRobin };
