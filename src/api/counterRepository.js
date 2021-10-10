import db from "../db/firestore";
import { collection, getDocs } from "firebase/firestore/lite";

const getCounters = async () => {
  const countersCol = collection(db, "counters");
  const counterSnapshot = await getDocs(countersCol);
  const counterList = counterSnapshot.docs.map((doc) => doc.data());
  return counterList;
};

export default getCounters;
