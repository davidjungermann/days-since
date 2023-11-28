import { db } from '../db/firestore';
import { doc, getDoc } from 'firebase/firestore';

const getDaily = async (uid) => {
  const agileRef = doc(db, 'agile', uid);
  const agile = await getDoc(agileRef);
  return agile.data().daily;
};

const getRetro = async (uid) => {
  const agileRef = doc(db, 'agile', uid);
  const agile = await getDoc(agileRef);
  return agile.data().retro;
};

const getAgile = async (uid) => {
  const agileRef = doc(db, 'agile', uid);
  const agile = await getDoc(agileRef);
  return agile.data();
};

export { getDaily, getRetro, getAgile };
