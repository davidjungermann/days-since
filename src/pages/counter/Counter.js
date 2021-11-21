import {
  getCounter,
  setCounterValue,
  setStreakValue,
  getCounterListener,
} from '../../api/counterRepository';
import React, { useState, useEffect } from 'react';
import Emoji from '../../components/emoji/Emoji';
import { Container, Row, Button, Col } from 'react-bootstrap';
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
            <h2>Days Since 🔥</h2>
            <h1 className="counter">{counter}</h1>
            <div className="increment-reset">
              <div className="emoji-container" onClick={handleIncrement}>
                <Emoji symbol="✅" fontSize={100} />
              </div>
              <div className="emoji-container" onClick={handleReset}>
                <Emoji symbol="❌" fontSize={100} />
              </div>
            </div>
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
