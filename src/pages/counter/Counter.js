import { getCounter, setCounterValue, getCounterListener } from '../../api/counterRepository';
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../db/firestore';
import Emoji from '../../components/emoji/Emoji';
import Button from 'react-bootstrap/Button';
import './Counter.css';

const Counter = ({ handleSignOut, uid }) => {
  const [counter, setCounter] = useState(null);
  useEffect(() => {
    if (uid) {
      (async () => {
        const counterValue = await getCounter(uid, 'value');
        setCounter(counterValue);
      })();

      // // TODO: Should be placed in the repo, but don't know how
      // const unsubscribe = onSnapshot(doc(db, 'counters', 'counter'), (doc) => {
      //   setCounter(doc.get('value'));
      // });
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
