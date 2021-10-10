import "./App.css";
import Emoji from "./components/emoji/Emoji";
import getCounters from "./api/counterRepository";
import { useState, useEffect } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    (async () => {
      const counterList = await getCounters();
      // TODO: Change this when implementing users
      setCounter(counterList[0].value);
    })();
  }, []);

  return (
    <div className="App">
      <div className="title">
        <h1 className="heading">Days Since 🔥</h1>
        <Emoji symbol="" fontSize={50} />
      </div>
      <h1 className="counter">{counter}</h1>
      <div className="increase-decrease">
        <div
          className="emoji-container"
          onClick={() => setCounter(counter + 1)}
        >
          <Emoji symbol="✅" fontSize={100} />
        </div>
        <div className="emoji-container" onClick={() => setCounter(0)}>
          <Emoji symbol="❌" fontSize={100} />
        </div>
      </div>
    </div>
  );
};

export default App;
