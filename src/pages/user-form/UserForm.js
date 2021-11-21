import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './UserForm.css';

const UserForm = ({ mode, handleAuthentication }) => {
  const [formState] = useState(mode === 'sign-in' ? 'Sign In' : 'Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container className="user-form">
      <Form className="user-form">
        <h1>{formState}</h1>
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
        <Button variant="primary" onClick={() => handleAuthentication(mode, email, password)}>
          {formState}
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
