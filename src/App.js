import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Counter from "./pages/counter/Counter";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/counter" exact component={Counter} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
