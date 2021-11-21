import { getCounter, setCounterValue, getCounterListener } from '../../api/counterRepository';
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../db/firestore';
import Emoji from '../../components/emoji/Emoji';
import Button from 'react-bootstrap/Button';
import './Counter.css';

const Counter = ({ handleSignOut, uid, email }) => {
  const [counter, setCounter] = useState(null);
  useEffect(() => {
    if (uid) {
      (async () => {
        const counterValue = await getCounter(uid, 'value');
        setCounter(counterValue);
      })();

      return () => getCounterListener(setCounter);
    }
  }, [uid]);

  const handleIncrement = async () => {
    if (uid) {
      setCounter(counter + 1);
      const id = await getCounter(uid, 'ref');
      setCounterValue(counter + 1, id);
    }
  };

  const handleReset = async () => {
    if (uid) {
      setCounter(0);
      const id = await getCounter(uid, 'ref');
      setCounterValue(0, id);
    }
  };

  return (
    <React.Fragment>
      <div class="container">
        <div class="row">
          <div class="col-sm">Longest streak</div>
          {}
          <div class="col-sm">
            <div className="title">
              <h1 className="heading">Days Since 🔥</h1>
              <Emoji symbol="" fontSize={50} />
            </div>
          </div>
          <div class="col-sm">
            {email && <span>{email}</span>}
            <Button variant="primary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
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
    </React.Fragment>
  );
};

export default Counter;
