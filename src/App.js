import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Counter from './pages/counter/Counter';
import UserForm from './pages/user-form/UserForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firestore';
import { signInUser, signUpUser } from './auth/authServices';
import './App.css';
import PrivateRoute from './components/private-route/PrivateRoute';

const App = () => {
  const [user] = useAuthState(auth);

  const handleAuthentication = (mode, email, password) => {
    mode === 'login' ? signInUser(auth, email, password) : signUpUser(auth, email, password);
  };

  return (
    <Router basename="/days-since">
      <div className="App">
        <>
          <Routes>
            <Route path="/" element={<Counter />} />
            <Route
              path="/login"
              element={<UserForm mode="login" handleAuthentication={handleAuthentication} />}
            />
            <Route
              path="/register"
              element={<UserForm mode="register" handleAuthentication={handleAuthentication} />}
            />

            <Route
              exact
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
