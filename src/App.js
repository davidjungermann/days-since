import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Counter from './pages/counter/Counter';
import UserForm from './pages/user-form/UserForm';
import { auth } from './db/firestore';
import { signInUser, signUpUser, signOutUser } from './auth/authServices';
import './App.css';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAuthentication = (mode, email, password) => {
    mode === 'login' ? signInUser(auth, email, password) : signUpUser(auth, email, password);
  };

  const handleSignOut = () => {
    signOutUser(auth);
  };

  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Counter handleSignOut={handleSignOut} />} />
          <Route
            path="/login"
            element={<UserForm mode="login" handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/register"
            element={<UserForm mode="register" handleAuthentication={handleAuthentication} />}
          />
        </Routes>
      </>
    </div>
  );
};

export default App;
