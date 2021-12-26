import {
  getCounter,
  setCounterValue,
  setStreakValue,
  getCounterListener,
} from '../../api/counterRepository';
import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { emojisplosion } from 'emojisplosion';
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
      emojisplosion({
        emojis: ['✅', '🎉', '🥳', '💯', '🍻', '💥', '🔥'],
      });
    }
  };

  return (
    <React.Fragment>
      {counter !== null && (
        <Container fluid>
          <Row>
            <Col
              xs={{ order: 2 }}
              sm={{ order: 2 }}
              md={{ order: 1 }}
              lg={{ order: 1 }}
              xl={{ order: 1 }}
              xxl={{ order: 1 }}
            >
              <h5>Longest Streak</h5>
              {uid && <h1>{streak}</h1>}
            </Col>
            <Col
              xs={{ order: 1 }}
              sm={{ order: 1 }}
              md={{ order: 2 }}
              lg={{ order: 2 }}
              xl={{ order: 2 }}
              xxl={{ order: 2 }}
            >
              <h2 className="title">Days Since</h2>
              <div className="counter-container">{counter}</div>

              <div className="increment-reset">
                <div className="icon-container" onClick={handleIncrement}>
                  <Plus className="icon" />
                </div>
                <div className="icon-container" onClick={handleReset}>
                  <Cross className="icon" />
                </div>
              </div>
            </Col>
            <Col
              xs={{ order: 3 }}
              sm={{ order: 3 }}
              md={{ order: 3 }}
              lg={{ order: 3 }}
              xl={{ order: 3 }}
              xxl={{ order: 3 }}
            >
              <div className="email">{email && <h5>{email}</h5>}</div>
              <Button variant="primary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Counter;
