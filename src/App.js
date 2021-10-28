import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firestore';
import Counter from './pages/counter/Counter';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import './App.css';

const App = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="App">
      <Router basename="/days-since">
        <Routes>
          <Route path="login" element={<Login user={user} loading={loading} />} />
          <Route path="register" element={<Register user={user} loading={loading} />} />
          <PrivateRoute path="counter" element={<Counter />} authed={user} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
