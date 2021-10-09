import React from "react";
import "./Emoji.css";
const Emoji = (props) => (
  <div
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
    style={{ fontSize: props.fontSize }}
  >
    {props.symbol}
  </div>
);
export default Emoji;
