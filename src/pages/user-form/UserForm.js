import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

const UserForm = ({ mode, handleAuthentication }) => {
  const [formState] = useState(mode === 'login' ? 'Sign In' : 'Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form>
      <h1>{formState}</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
  );
};

export default UserForm;
