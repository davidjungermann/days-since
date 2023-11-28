import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

export const UserForm = ({
  mode,
  handleAuthentication,
  setRegister,
  errorMessage,
  setErrorMessage,
}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(mode === 'sign-in' ? 'Sign In' : 'Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const flipFormState = () => {
    return mode === 'sign-in' ? 'Sign Up' : 'Sign In';
  };

  const flipMode = () => {
    return mode === 'sign-in' ? 'sign-up' : 'sign-in';
  };

  const handleNavigation = () => {
    setFormState(flipFormState());
    const newMode = flipMode();
    navigate('/' + newMode);
    setRegister(newMode);
  };

  const infoText = () => {
    return mode === 'sign-in' ? "If you don't have an account" : 'If you already have an account';
  };

  const handleSubmit = () => {
    if (email && password) {
      handleAuthentication(mode, email, password);
    }

    if (email.length === 0) {
      setErrorMessage('Input an email address');
    } else if (password.length === 0) {
      setErrorMessage('Input a password');
    }
  };

  return (
    <Container className="user-form">
      <Form className="user-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          {formState}
        </Button>
        <Container className="error-message-container">
          <span className="error-message">{errorMessage}</span>
        </Container>
        <h5 className="info-text">{infoText()}</h5>
        <Button className="mode-button" variant="secondary" onClick={handleNavigation}>
          {flipFormState()}
        </Button>
      </Form>
    </Container>
  );
};
