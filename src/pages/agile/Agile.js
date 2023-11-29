import React, { useState, useEffect } from 'react';
import { getAgile, getDaily, getRetro } from '../../api/agileRepository';
import { ReactComponent as Daily } from '../../assets/daily.svg';
import { ReactComponent as Retro } from '../../assets/retro.svg';
import { Container, Row, Col } from 'react-bootstrap';
import './Agile.css';

export const Agile = ({ uid }) => {
  const [daily, setDaily] = useState(null);
  const [retro, setRetro] = useState(null);

  useEffect(() => {
    if (uid) {
      (async () => {
        let support = await getAgile(uid);
        if (support) {
          setDaily(await getDaily(uid));
          setRetro(await getRetro(uid));
        }
      })();
    }
  }, [uid]); // Ensure uid is a dependency

  return (
    <Container className="agile-container">
      <Row>
        <Col xs={12} md={6}>
          <div className="agile-unit">
            <h2>Standup</h2>
            <Daily className="agile-icon" />
            <h4>{daily}</h4>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="agile-unit">
            <h2>Retro</h2>
            <Retro className="agile-icon" />
            <h4>{retro}</h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
