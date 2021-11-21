import { Routes, Route, useNavigate } from 'react-router-dom';
import Counter from './pages/counter/Counter';
import UserForm from './pages/user-form/UserForm';
import { auth } from './db/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createUser } from './api/userRepository';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { createCounter } from './api/counterRepository';

const App = () => {
  const [user] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/sign-up');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAuthentication = (mode, email, password) => {
    mode === 'sign-in'
      ? handleSignInUser(auth, email, password)
      : handleSignUpUser(auth, email, password);
  };

  const handleSignUpUser = (auth, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        createUser(response.user);
        createCounter(response.user.uid);
        setUid(response.user.uid);
      })
      // TODO: Implement error handling
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const handleSignInUser = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUid(response.user.uid);
        return response.user;
      })
      .catch((error) => {
        // TODO: Implement error handling
        console.log(error.code, error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      // TODO: Implement error handling
      .catch((error) => {});
  };

  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Counter handleSignOut={handleSignOut} uid={uid} />} />
          <Route
            path="/sign-in"
            element={<UserForm mode="sign-in" handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/sign-up"
            element={<UserForm mode="sign-up" handleAuthentication={handleAuthentication} />}
          />
        </Routes>
      </>
    </div>
  );
};

export default App;
