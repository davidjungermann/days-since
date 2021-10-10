import "./App.css";
import Emoji from "./components/emoji/Emoji";
import { getCounterValue, setCounterValue } from "./api/counterRepository";
import { useState, useEffect } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    (async () => {
      const counterValue = await getCounterValue();
      setCounter(counterValue);
    })();
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
    <div className="App">
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
    </div>
  );
};

export default App;
