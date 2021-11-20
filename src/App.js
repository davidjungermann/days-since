import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Counter from './pages/counter/Counter';
import UserForm from './pages/user-form/UserForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firestore';
import { signInUser, signUpUser, signOutUser } from './auth/authServices';
import './App.css';

const App = () => {
  const [user] = useAuthState(auth);

  const handleAuthentication = (mode, email, password) => {
    mode === 'login' ? signInUser(auth, email, password) : signUpUser(auth, email, password);
  };

  const handleSignOut = () => {
    signOutUser(auth);
  };

  return (
    <Router basename="/days-since">
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

            <Route
              path="/"
              render={() => {
                return user ? <Navigate to="/" /> : <Navigate to="/login" />;
              }}
            />
          </Routes>
        </>
      </div>
    </Router>
  );
};

export default App;
