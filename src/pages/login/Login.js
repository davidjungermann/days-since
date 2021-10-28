import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signInUser } from "../../auth/authServices";
import "./Login.css";

const Login = ({ user, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      console.log(user);
      navigate("/counter");
    }
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInUser(email, password)}
        >
          Login
        </button>
        <div>
          <Navigate to="/reset">Forgot Password</Navigate>
        </div>
        <p></p>
        <div>
          Don't have an account? <Navigate to="/login">Register</Navigate> now.
        </div>
      </div>
    </div>
  );
};
export default Login;
