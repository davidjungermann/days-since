import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD3JgRl5KWKzWo-tVXoMqKc5HZzoNr8r5Q',
  authDomain: 'days-since-f2f53.firebaseapp.com',
  projectId: 'days-since-f2f53',
  storageBucket: 'days-since-f2f53.appspot.com',
  messagingSenderId: '770516759412',
  appId: '1:770516759412:web:6a858719defadfc696f221',
  measurementId: 'G-EDN478SNWY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);

export { db, auth };
