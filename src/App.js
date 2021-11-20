import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Counter from './pages/counter/Counter';
import UserForm from './pages/user-form/UserForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firestore';
import { signInUser, signUpUser } from './auth/authServices';
import './App.css';

const App = () => {
  const [user, loading] = useAuthState(auth);
  console.log(user);

  const handleAuthentication = (mode, email, password) => {
    mode === 'login' ? signInUser(auth, email, password) : signUpUser(auth, email, password);
  };

  return (
    <Router basename="/days-since">
      <div className="App">
        <>
          <Routes>
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
    </Router>
  );
};

export default App;
