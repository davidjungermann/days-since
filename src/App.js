import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Root } from './pages/root/Root';
import { UserForm } from './pages/user-form/UserForm';
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
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      } else if (register === 'sign-up') {
        navigate('/sign-up');
      } else {
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

  const handleSignUpUser = async (auth, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      createUser(response.user);
      createCounter(response.user.uid);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignInUser = async (auth, email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <>
        <Routes basename="days-since">
          <Route
            path="/"
            element={<Root handleSignOut={handleSignOut} uid={user?.uid} email={user?.email} />}
          />
          <Route
            path="/sign-in"
            element={
              <UserForm
                mode="sign-in"
                handleAuthentication={handleAuthentication}
                setRegister={setRegister}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
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
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </div>
  );
};

export default App;
