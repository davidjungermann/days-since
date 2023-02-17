import { db } from '../db/firestore';
import { doc, getDoc } from 'firebase/firestore';

const supportRef = doc(db, 'support', 'current');

const getBatman = async (uid) => {
  const support = await getDoc(supportRef);
  const data = support.data();
  return support.data().batman;
};

const getRobin = async (uid) => {
  const support = await getDoc(supportRef);
  const data = support.data();
  return support.data().robin;
};

const getCaptain = async (uid) => {
  const support = await getDoc(supportRef);
  const data = support.data();
  return support.data().captain;
};

const getSupport = async (uid) => {
  const support = await getDoc(supportRef);
  const data = support.data();
  return data.uid === uid;
};

export { getBatman, getRobin, getCaptain, getSupport };
