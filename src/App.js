import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firestore';
import Counter from './pages/counter/Counter';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRoute from './components/private-route/PrivateRoute';
import './App.css';
import Logout from './components/logout/Logout';

const App = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="App">
      <Logout></Logout>
      <Router basename="/days-since">
        <Routes>
          <Route path="login" element={<Login user={user} loading={loading} />} />
          <Route path="register" element={<Register user={user} loading={loading} />} />
          <PrivateRoute path="counter" element={<Counter />} user={user} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
