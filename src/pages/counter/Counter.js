import { getCounterValue, setCounterValue } from '../../api/counterRepository';
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../db/firestore';
import Emoji from '../../components/emoji/Emoji';
import Button from 'react-bootstrap/Button';
import './Counter.css';

const Counter = ({ handleSignOut, auth }) => {
  const [counter, setCounter] = useState(null);
  useEffect(() => {
    (async () => {
      const counterValue = await getCounterValue();
      setCounter(counterValue);
    })();

    // TODO: Should be placed in the repo, but don't know how
    const unsubscribe = onSnapshot(doc(db, 'counters', 'counter'), (doc) => {
      setCounter(doc.get('value'));
    });
    return () => unsubscribe();
  }, []);

  const handleIncrement = () => {
    setCounter(counter + 1);
    setCounterValue(counter + 1);
  };

  const handleReset = () => {
    setCounter(0);
    setCounterValue(0);
  };

  return (
    <React.Fragment>
      <div className="title">
        <h1 className="heading">Days Since 🔥</h1>
        <Emoji symbol="" fontSize={50} />
      </div>
      <h1 className="counter">{counter}</h1>
      <div className="increment-reset">
        <div className="emoji-container" onClick={handleIncrement}>
          <Emoji symbol="✅" fontSize={100} />
        </div>
        <div className="emoji-container" onClick={handleReset}>
          <Emoji symbol="❌" fontSize={100} />
        </div>
      </div>
      <Button variant="primary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </React.Fragment>
  );
};

export default Counter;
