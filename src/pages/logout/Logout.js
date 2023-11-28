import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Logout.css';

export const Logout = ({ handleSignOut, email }) => {
  return (
    <React.Fragment>
      <Container className="logout-container">
        {email && <div className="email-text">{email}</div>}
        <Button variant="primary" onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </Button>
      </Container>
    </React.Fragment>
  );
};
