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
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      } else if (register === 'sign-up') {
        navigate('/sign-up');
      } else if (register === 'sign-in') {
        navigate('/sign-in');
      }
    });
    return () => unsubscribe();
  }, [navigate, register]);

  const handleAuthentication = async (mode, email, password) => {
    mode === 'sign-in'
      ? handleSignInUser(auth, email, password)
      : handleSignUpUser(auth, email, password);
  };

  // TODO: Error handling
  const handleSignUpUser = async (auth, email, password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    createUser(response.user);
    createCounter(response.user.uid);
  };

  // TODO: Error handling
  const handleSignInUser = async (auth, email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // TODO: Error handling
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path="/"
            element={<Counter handleSignOut={handleSignOut} uid={user?.uid} email={user?.email} />}
          />
          <Route
            path="/sign-in"
            element={
              <UserForm
                mode="sign-in"
                handleAuthentication={handleAuthentication}
                setRegister={setRegister}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <UserForm
                mode="sign-up"
                handleAuthentication={handleAuthentication}
                setRegister={setRegister}
              />
            }
          />
        </Routes>
      </>
    </div>
  );
};

export default App;
