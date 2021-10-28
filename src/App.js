import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Counter from "./pages/counter/Counter";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router basename="/days-since">
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/counter" exact element={<Counter />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
