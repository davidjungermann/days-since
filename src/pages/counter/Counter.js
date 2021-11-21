import {
  getCounter,
  setCounterValue,
  setStreakValue,
  getCounterListener,
} from '../../api/counterRepository';
import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Cross } from '../../assets/cross.svg';
import './Counter.css';

const Counter = ({ handleSignOut, uid, email }) => {
  const [counter, setCounter] = useState(null);
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    if (uid) {
      (async () => {
        const counterRef = await getCounter(uid);
        setCounter(counterRef.data().value);
        setStreak(counterRef.data().streak);
      })();

      return () => getCounterListener(setCounter);
    }
  }, [uid]);

  const handleIncrement = async () => {
    if (uid) {
      const newValue = counter + 1;
      setCounter(newValue);
      const counterRef = await getCounter(uid);
      setCounterValue(newValue, counterRef.id);
      handleStreak(newValue, counterRef.id);
    }
  };

  const handleReset = async () => {
    if (uid) {
      setCounter(0);
      const counterRef = await getCounter(uid);
      setCounterValue(0, counterRef.id);
    }
  };

  const handleStreak = async (newValue, uid) => {
    if (newValue > streak) {
      setStreak(newValue);
      setStreakValue(newValue, uid);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <h5>Longest Streak</h5>
            {uid && <span>{streak}</span>}
          </Col>
          <Col>
            <Row>
              <h2>Days Since 🔥</h2>
              <h1 className="counter">{counter}</h1>
              <div className="increment-reset">
                <div className="icon-container" onClick={handleIncrement}>
                  <Plus className="icon" />
                </div>
                <div className="icon-container" onClick={handleReset}>
                  <Cross className="icon" />
                </div>
              </div>
            </Row>
          </Col>
          <Col>
            {email && <h5>{email}</h5>}
            <Button variant="primary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Counter;
