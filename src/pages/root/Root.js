import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Counter } from '../counter/Counter';
import { Logout } from '../logout/Logout';
import { SupportDevelopers } from '../support/SupportDevelopers';
import { getUser } from '../../api/userRepository';
import { Agile } from '../agile/Agile';

export const Root = ({ handleSignOut, uid, email }) => {
  const [renderSupport, setRenderSupport] = useState(null);
  const [renderCounter, setRenderCounter] = useState(null);
  const [renderAgile, setRenderAgile] = useState(null);

  useEffect(() => {
    if (uid) {
      (async () => {
        const userDoc = await getUser(uid);
        setRenderSupport(userDoc.support);
        setRenderCounter(userDoc.counter);
        setRenderAgile(userDoc.agile);
      })();
    }
  }, [uid]);

  // Array to hold components that are to be rendered
  const components = [
    renderSupport ? <SupportDevelopers uid={uid} /> : null,
    renderCounter ? <Counter handleSignOut={handleSignOut} uid={uid} email={email} /> : null,
    renderAgile ? <Agile uid={uid} /> : null,
  ].filter(Boolean); // Filter out null values

  // Calculate the column width based on the number of components to be rendered
  const colWidth = components.length > 0 ? Math.floor(12 / components.length) : 12;
  return (
    <Container fluid>
      <Row>
        {/* Dynamically render components based on their presence */}
        {components.map((Component, index) => (
          <Col key={index} md={colWidth} className="mb-3">
            {Component}
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={{ span: 2, offset: 0 }}>
          <Logout handleSignOut={handleSignOut} email={email} />
        </Col>
      </Row>
    </Container>
  );
};
