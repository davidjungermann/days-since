import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Counter from './pages/counter/Counter';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firestore';
import './App.css';

const App = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="App">
      <Router basename="/days-since">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Counter />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
