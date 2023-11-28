import { db } from '../db/firestore';
import { doc, getDoc } from 'firebase/firestore';

const getBatman = async (uid) => {
  const supportRef = doc(db, 'support', uid);
  const support = await getDoc(supportRef);
  return support.data().batman;
};

const getRobin = async (uid) => {
  const supportRef = doc(db, 'support', uid);
  const support = await getDoc(supportRef);
  return support.data().robin;
};

const getCaptain = async (uid) => {
  const supportRef = doc(db, 'support', uid);
  const support = await getDoc(supportRef);
  return support.data().captain;
};

const getSupport = async (uid) => {
  const supportRef = doc(db, 'support', uid);
  const support = await getDoc(supportRef);
  return support.data();
};

export { getBatman, getRobin, getCaptain, getSupport };
