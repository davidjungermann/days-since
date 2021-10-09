import "./App.css";
import Emoji from "./components/emoji/Emoji";
import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <div className="title">
        <h1 className="heading">Days Since 🔥</h1>
        <Emoji symbol="" fontSize={50} />
      </div>
      <h1 className="counter">{counter}</h1>
      <div className="increase-decrease">
        <div className="check" onClick={() => setCounter(counter + 1)}>
          <Emoji symbol="✅" fontSize={75} />
        </div>
        <div className="cross" onClick={() => setCounter(0)}>
          <Emoji symbol="❌" fontSize={75} />
        </div>
      </div>
    </div>
  );
};

export default App;
