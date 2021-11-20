import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Counter from './pages/counter/Counter';
import UserForm from './pages/user-form/UserForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firestore';
import './App.css';

const App = () => {
  const [user, loading] = useAuthState(auth);
  console.log(user);
  return (
    <Router basename="/days-since">
      <div className="App">
        <>
          <Routes>
            <Route path="/login" element={<UserForm mode="login" auth={auth} />} />
            <Route path="/register" element={<UserForm mode="register" auth={auth} />} />
          </Routes>
        </>
      </div>
    </Router>
  );
};

export default App;
