import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

const UserForm = ({ mode }) => {
  const [formState] = useState(mode === 'login' ? 'Sign In' : 'Sign Up');
  return (
    <Form>
      <h1>{formState}</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {formState}
      </Button>
    </Form>
  );
};

export default UserForm;
